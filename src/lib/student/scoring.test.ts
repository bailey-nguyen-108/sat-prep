import { scorePracticeSession } from "@/lib/student/scoring";

describe("scorePracticeSession", () => {
  it("calculates score and weak subtopics from submitted answers", () => {
    const result = scorePracticeSession(
      [
        {
          id: "q1",
          subject: "math",
          difficulty: "medium",
          subtopic: "Linear equations",
          prompt: "Question 1",
          choice_a: "A",
          choice_b: "B",
          choice_c: "C",
          choice_d: "D",
          correct_choice: "A",
          explanation: "Explain 1"
        },
        {
          id: "q2",
          subject: "math",
          difficulty: "medium",
          subtopic: "Linear equations",
          prompt: "Question 2",
          choice_a: "A",
          choice_b: "B",
          choice_c: "C",
          choice_d: "D",
          correct_choice: "B",
          explanation: "Explain 2"
        },
        {
          id: "q3",
          subject: "math",
          difficulty: "medium",
          subtopic: "Systems of equations",
          prompt: "Question 3",
          choice_a: "A",
          choice_b: "B",
          choice_c: "C",
          choice_d: "D",
          correct_choice: "C",
          explanation: "Explain 3"
        }
      ],
      {
        q1: "A",
        q2: "D",
        q3: "D"
      }
    );

    expect(result).toEqual({
      score: 33,
      correctCount: 1,
      questionCount: 3,
      weakSubtopics: ["Linear equations", "Systems of equations"]
    });
  });
});
