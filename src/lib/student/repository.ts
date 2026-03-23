import type { User } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { QUESTION_BANK } from "@/lib/student/question-bank";
import { scorePracticeSession } from "@/lib/student/scoring";
import type {
  AnswerChoice,
  PracticeDifficulty,
  PracticeMode,
  PracticeSubject,
  QuestionRecord
} from "@/lib/types/student";

export type StudentProfile = {
  id: string;
  email: string;
  full_name: string | null;
  role: "student" | "teacher" | "admin";
  target_score: number | null;
};

export type PracticeSessionSummary = {
  id: string;
  subject: PracticeSubject;
  difficulty: PracticeDifficulty;
  mode: PracticeMode;
  started_at: string;
  completed_at: string | null;
  score: number | null;
  correct_count: number | null;
  question_count: number;
  weak_subtopics: string[];
};

export type SessionQuestionRecord = QuestionRecord & {
  position: number;
  selected_choice: AnswerChoice | null;
  is_correct: boolean;
};

export type PracticeSessionDetail = PracticeSessionSummary & {
  questions: SessionQuestionRecord[];
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildFullName(user: User) {
  const metadataName = user.user_metadata?.full_name;
  if (typeof metadataName === "string" && metadataName.trim().length > 0) {
    return metadataName.trim();
  }

  const emailPrefix = user.email?.split("@")[0] ?? "Student";
  return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
}

export async function ensureQuestionBankSeeded() {
  const admin = createSupabaseAdminClient();
  const { count, error } = await admin
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("status", "published");

  if (error) {
    throw new Error(`Unable to read questions table: ${error.message}`);
  }

  if ((count ?? 0) >= QUESTION_BANK.length) {
    return;
  }

  const { error: insertError } = await admin.from("questions").insert(
    QUESTION_BANK.map((question) => ({
      ...question,
      status: "published"
    }))
  );

  if (insertError && !insertError.message.toLowerCase().includes("duplicate")) {
    throw new Error(`Unable to seed question bank: ${insertError.message}`);
  }
}

export async function upsertStudentProfile(user: User) {
  const admin = createSupabaseAdminClient();
  const profile = {
    id: user.id,
    email: user.email ?? "",
    full_name: buildFullName(user),
    role: "student" as const
  };

  const { data, error } = await admin
    .from("profiles")
    .upsert(profile, { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Unable to sync student profile: ${error.message}`);
  }

  return data as StudentProfile;
}

export async function getAuthenticatedStudent() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    if (error.message.toLowerCase().includes("auth session missing")) {
      return null;
    }

    throw new Error(`Unable to fetch authenticated user: ${error.message}`);
  }

  if (!user || !user.email) {
    return null;
  }

  const profile = await upsertStudentProfile(user);
  return { user, profile };
}

export async function getDashboardData(userId: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("started_at", { ascending: false })
    .limit(6);

  if (error) {
    throw new Error(`Unable to load dashboard data: ${error.message}`);
  }

  const sessions = (data ?? []) as PracticeSessionSummary[];
  const completedSessions = sessions.filter((session) => session.completed_at);
  const latestCompleted = completedSessions[0] ?? null;
  const currentStreak = completedSessions.length;

  return {
    recentSessions: sessions,
    latestCompleted,
    currentStreak
  };
}

async function fetchCandidateQuestions(subject: PracticeSubject, difficulty: PracticeDifficulty) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("subject", subject)
    .eq("status", "published");

  if (error) {
    throw new Error(`Unable to load question bank: ${error.message}`);
  }

  const questions = (data ?? []) as QuestionRecord[];
  const exactDifficulty = questions.filter((question) => question.difficulty === difficulty);
  const otherDifficulties = questions.filter((question) => question.difficulty !== difficulty);

  return [...shuffle(exactDifficulty), ...shuffle(otherDifficulties)];
}

export async function createPracticeSession(input: {
  userId: string;
  subject: PracticeSubject;
  difficulty: PracticeDifficulty;
  mode: PracticeMode;
  questionCount?: number;
}) {
  await ensureQuestionBankSeeded();

  const questionCount = input.questionCount ?? 10;
  const candidates = await fetchCandidateQuestions(input.subject, input.difficulty);
  const selectedQuestions = candidates.slice(0, questionCount);

  if (selectedQuestions.length < questionCount) {
    throw new Error(`Not enough ${input.subject} questions are available yet.`);
  }

  const admin = createSupabaseAdminClient();
  const { data: session, error: sessionError } = await admin
    .from("practice_sessions")
    .insert({
      user_id: input.userId,
      subject: input.subject,
      difficulty: input.difficulty,
      mode: input.mode,
      question_count: questionCount
    })
    .select("*")
    .single();

  if (sessionError || !session) {
    throw new Error(`Unable to create practice session: ${sessionError?.message ?? "unknown error"}`);
  }

  const { error: answerError } = await admin.from("practice_session_answers").insert(
    selectedQuestions.map((question, index) => ({
      session_id: session.id,
      question_id: question.id,
      position: index + 1
    }))
  );

  if (answerError) {
    throw new Error(`Unable to attach session questions: ${answerError.message}`);
  }

  return session.id as string;
}

export async function getPracticeSession(sessionId: string, userId: string) {
  const supabase = createSupabaseServerClient();
  const { data: session, error: sessionError } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("id", sessionId)
    .eq("user_id", userId)
    .single();

  if (sessionError || !session) {
    return null;
  }

  const { data: answers, error: answersError } = await supabase
    .from("practice_session_answers")
    .select(
      "position, selected_choice, is_correct, question:questions(id, subject, difficulty, subtopic, prompt, choice_a, choice_b, choice_c, choice_d, correct_choice, explanation)"
    )
    .eq("session_id", sessionId)
    .order("position", { ascending: true });

  if (answersError) {
    throw new Error(`Unable to load session answers: ${answersError.message}`);
  }

  return {
    ...(session as PracticeSessionSummary),
    questions: (answers ?? []).map((row: any) => ({
      ...(row.question as QuestionRecord),
      position: row.position,
      selected_choice: row.selected_choice,
      is_correct: row.is_correct
    }))
  } as PracticeSessionDetail;
}

export async function findLatestSession(userId: string, completed: boolean) {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("practice_sessions")
    .select("id")
    .eq("user_id", userId)
    .order("started_at", { ascending: false })
    .limit(1);

  query = completed ? query.not("completed_at", "is", null) : query.is("completed_at", null);

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new Error(`Unable to load latest session: ${error.message}`);
  }

  return data?.id as string | undefined;
}

export async function completePracticeSession(input: {
  sessionId: string;
  userId: string;
  answers: Record<string, AnswerChoice | undefined>;
}) {
  const session = await getPracticeSession(input.sessionId, input.userId);

  if (!session) {
    throw new Error("Practice session not found.");
  }

  const questionMap = Object.fromEntries(
    session.questions.map((question) => [question.id, input.answers[question.id]])
  );
  const result = scorePracticeSession(session.questions, questionMap);
  const admin = createSupabaseAdminClient();

  for (const question of session.questions) {
    const selectedChoice = input.answers[question.id] ?? null;
    const { error } = await admin
      .from("practice_session_answers")
      .update({
        selected_choice: selectedChoice,
        is_correct: selectedChoice === question.correct_choice
      })
      .eq("session_id", input.sessionId)
      .eq("question_id", question.id);

    if (error) {
      throw new Error(`Unable to save answer for question ${question.id}: ${error.message}`);
    }
  }

  const { error: updateError } = await admin
    .from("practice_sessions")
    .update({
      completed_at: new Date().toISOString(),
      score: result.score,
      correct_count: result.correctCount,
      question_count: result.questionCount,
      weak_subtopics: result.weakSubtopics
    })
    .eq("id", input.sessionId)
    .eq("user_id", input.userId);

  if (updateError) {
    throw new Error(`Unable to finalize practice session: ${updateError.message}`);
  }

  return result;
}
