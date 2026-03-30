import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/layout/StudentShell";
import { ResultsReviewList, type ReviewItem } from "@/components/practice/ResultsReviewList";
import {
  findLatestSession,
  getAuthenticatedStudent,
  getPracticeSession
} from "@/lib/student/repository";
import { getTopicAccuracies } from "@/lib/student/scoring";
import type { AnswerChoice } from "@/lib/types/student";

export default async function SessionResultsPage({
  searchParams
}: {
  searchParams?: { session?: string };
}) {
  const auth = await getAuthenticatedStudent();

  if (!auth) {
    redirect("/login");
  }

  const sessionId = searchParams?.session ?? (await findLatestSession(auth.profile.id, true));

  if (!sessionId) {
    redirect("/student/practice/setup");
  }

  const session = await getPracticeSession(sessionId, auth.profile.id);

  if (!session || !session.completed_at) {
    redirect(`/student/practice/session?session=${sessionId}`);
  }

  const flaggedCookie = cookies().get(`sat-prep-flags-${sessionId}`)?.value;
  const flaggedQuestionIds = safeParseStringArray(flaggedCookie);

  const answers = Object.fromEntries(
    session.questions.map((question) => [question.id, question.selected_choice ?? undefined])
  ) as Record<string, AnswerChoice | undefined>;

  const accuracy =
    session.question_count > 0
      ? Math.round(((session.correct_count ?? 0) / session.question_count) * 100)
      : 0;

  const topicAccuracies = getTopicAccuracies(session.questions, answers);
  const weakTopics = topicAccuracies.filter((topic) => topic.accuracyPercent < 70).slice(0, 2);
  const isStrongState = weakTopics.length === 0;
  const pageTitle = isStrongState ? "You cleared every target." : "You finished strong.";
  const pageSubtitle = isStrongState
    ? "No tracked topic fell below 70% accuracy. The next best move is a harder or faster set."
    : "Your latest results point to a narrow set of math skills that are worth another round right now.";
  const reviewCount = session.questions.filter((question) => !question.is_correct).length;

  const reviewItems: ReviewItem[] = session.questions.map((question) => {
    const studentAnswerLetter = question.selected_choice;
    const studentAnswerText = studentAnswerLetter
      ? getChoiceText(question, studentAnswerLetter)
      : null;
    const correctAnswerText = getChoiceText(question, question.correct_choice);
    const flagged = flaggedQuestionIds.includes(question.id);
    const status = flagged
      ? "Flagged"
      : studentAnswerLetter == null
        ? "Unanswered"
        : question.is_correct
          ? "Correct"
          : "Incorrect";

    return {
      id: question.id,
      questionNumber: question.position,
      status,
      studentAnswerLetter,
      studentAnswerText,
      correctAnswerLetter: question.correct_choice,
      correctAnswerText,
      explanationText: question.explanation
    };
  });

  const defaultExpandedId =
    reviewItems.find((item) => item.status === "Incorrect")?.id ??
    reviewItems.find((item) => item.status === "Flagged")?.id;

  return (
    <StudentShell activeTab="review" pageClassName="screen-fade-in">
      <div className="page-hero-copy results-hero-copy">
        <p className="stat-label results-eyebrow">Session complete</p>
        <h1 className="page-title page-title-xl">{pageTitle}</h1>
        <p className="page-subtitle">{pageSubtitle}</p>
      </div>

      <section className="results-top-grid">
        <article
          className={`card score-card score-card-results ${isStrongState ? "card-primary" : "card-accent"}`}
        >
          <p className="stat-label">Session score</p>
          <p className="stat-value score-card-value">
            {session.correct_count ?? 0} / {session.question_count}
          </p>
          <p className="results-score-copy">
            {accuracy}% accuracy •{" "}
            {isStrongState ? "no follow-up triggered" : "needs another review block"}
          </p>
          <div className="results-metrics">
            <div className="results-metric">
              <span className="results-metric-label">Correct</span>
              <strong className="stat-value results-metric-value">{session.correct_count ?? 0}</strong>
            </div>
            <div className="results-metric">
              <span className="results-metric-label">Review</span>
              <strong className="stat-value results-metric-value">{reviewCount}</strong>
            </div>
            <div className="results-metric">
              <span className="results-metric-label">Weak areas</span>
              <strong className="stat-value results-metric-value">
                {isStrongState ? 0 : weakTopics.length}
              </strong>
            </div>
          </div>
        </article>

        <article className="card dashboard-card results-followup-card">
          <h2 className="card-title">
            {isStrongState ? "No weak-area follow-up needed" : "Weak-area follow-up"}
          </h2>
          <p className="page-subtitle">
            {isStrongState
              ? "Every topic stayed above the follow-up threshold, so recommend a stretch session instead of remediation."
              : "We found two weak sub-topics below 70% accuracy. Your next recommended session should pull approved questions from those areas."}
          </p>

          <div className="inline-list results-followup-list">
            {isStrongState ? (
              <div className="inline-row">
                <span>All tracked topics</span>
                <strong className="text-success">70%+</strong>
              </div>
            ) : (
              weakTopics.map((topic) => (
                <div className="inline-row" key={topic.subtopic}>
                  <span>{topic.subtopic}</span>
                  <strong className={topic.accuracyPercent < 60 ? "text-accent" : "text-warning"}>
                    {topic.accuracyPercent}%
                  </strong>
                </div>
              ))
            )}
          </div>

          <Link className="button-primary results-followup-cta" href="/student/practice/setup">
            {isStrongState ? "Try a harder set" : "Practice weak areas"}
          </Link>
        </article>
      </section>

      <section className="card dashboard-card results-review-card" id="breakdown">
        <h2 className="card-title">Question review</h2>
        <p className="page-subtitle">
          Open a question to compare your answer with the correct answer and explanation.
        </p>
        <ResultsReviewList items={reviewItems} defaultExpandedId={defaultExpandedId} />
      </section>
    </StudentShell>
  );
}

function getChoiceText(
  question: {
    choice_a: string;
    choice_b: string;
    choice_c: string;
    choice_d: string;
  },
  choice: AnswerChoice
) {
  const choiceMap = {
    A: question.choice_a,
    B: question.choice_b,
    C: question.choice_c,
    D: question.choice_d
  };

  return choiceMap[choice];
}

function safeParseStringArray(value?: string) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}
