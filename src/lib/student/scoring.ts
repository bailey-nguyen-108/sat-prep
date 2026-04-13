import type { QuestionRecord, SessionResult, TopicAccuracy } from "@/lib/types/student";

export function getTopicAccuracies(
  questions: QuestionRecord[],
  answers: Record<string, string | undefined>
) {
  const bySubtopic = new Map<string, { total: number; correct: number }>();

  questions.forEach((question) => {
    const entry = bySubtopic.get(question.subtopic) ?? { total: 0, correct: 0 };
    entry.total += 1;
    if (answers[question.id] === question.correct_choice) {
      entry.correct += 1;
    }
    bySubtopic.set(question.subtopic, entry);
  });

  return [...bySubtopic.entries()]
    .map(
      ([subtopic, value]): TopicAccuracy => ({
        subtopic,
        total: value.total,
        correct: value.correct,
        accuracyPercent: value.total === 0 ? 0 : Math.round((value.correct / value.total) * 100)
      })
    )
    .sort((a, b) => {
      if (a.accuracyPercent !== b.accuracyPercent) {
        return a.accuracyPercent - b.accuracyPercent;
      }
      return a.subtopic.localeCompare(b.subtopic);
    });
}

export function scorePracticeSession(
  questions: QuestionRecord[],
  answers: Record<string, string | undefined>
): SessionResult {
  const correctCount = questions.reduce((count, question) => {
    return answers[question.id] === question.correct_choice ? count + 1 : count;
  }, 0);

  const score = questions.length === 0 ? 0 : Math.round((correctCount / questions.length) * 100);

  const weakSubtopics = getTopicAccuracies(questions, answers)
    .filter((topic) => topic.accuracyPercent < 70)
    .slice(0, 2)
    .map((topic) => topic.subtopic);

  return {
    score,
    correctCount,
    questionCount: questions.length,
    weakSubtopics
  };
}
