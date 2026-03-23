export type PracticeMode = "timed" | "untimed";
export type PracticeDifficulty = "easy" | "medium" | "hard";
export type PracticeSubject = "math" | "reading-writing";
export type AnswerChoice = "A" | "B" | "C" | "D";

export type QuestionRecord = {
  id: string;
  subject: PracticeSubject;
  difficulty: PracticeDifficulty;
  subtopic: string;
  prompt: string;
  choice_a: string;
  choice_b: string;
  choice_c: string;
  choice_d: string;
  correct_choice: AnswerChoice;
  explanation: string;
};

export type SessionResult = {
  score: number;
  correctCount: number;
  questionCount: number;
  weakSubtopics: string[];
};
