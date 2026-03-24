import type { QuestionRecord, SessionResult } from "@/lib/types/student";

export function scorePracticeSession(
  questions: QuestionRecord[],
  answers: Record<string, string | undefined>
): SessionResult {
  const correctCount = questions.reduce((count, question) => {
    return answers[question.id] === question.correct_choice ? count + 1 : count;
  }, 0);

  const score = questions.length === 0 ? 0 : Math.round((correctCount / questions.length) * 100);

  const incorrectBySubtopic = new Map<string, number>();
  questions.forEach((question) => {
    if (answers[question.id] !== question.correct_choice) {
      incorrectBySubtopic.set(
        question.subtopic,
        (incorrectBySubtopic.get(question.subtopic) ?? 0) + 1
      );
    }
  });

  const weakSubtopics = [...incorrectBySubtopic.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([subtopic]) => subtopic);

  return {
    score,
    correctCount,
    questionCount: questions.length,
    weakSubtopics
  };
}
