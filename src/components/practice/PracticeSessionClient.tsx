"use client";

import { useMemo, useState } from "react";
import type { PracticeSessionDetail } from "@/lib/student/repository";
import type { AnswerChoice } from "@/lib/types/student";

const choiceKeys: AnswerChoice[] = ["A", "B", "C", "D"];

export function PracticeSessionClient({ session }: { session: PracticeSessionDetail }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerChoice | undefined>>(() =>
    Object.fromEntries(
      session.questions.map((question) => [question.id, question.selected_choice ?? undefined])
    )
  );

  const currentQuestion = session.questions[currentIndex];
  const answeredCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers]
  );
  const remainingCount = session.questions.length - answeredCount;
  const progressWidth = `${Math.round(((currentIndex + 1) / session.questions.length) * 100)}%`;
  const timerValue = session.mode === "timed" ? "11:42" : "Focus mode";

  return (
    <>
      <div className="page-header">
        <div className="page-hero-copy" style={{ width: "min(820px, 100%)" }}>
          <p className="stat-label" style={{ color: "var(--color-primary)", marginBottom: 8 }}>
            {session.subject === "math" ? "Math" : "Reading & Writing"} •{" "}
            {session.mode === "timed" ? "Timed practice" : "Untimed practice"}
          </p>
          <h1 className="page-title">
            Question {currentIndex + 1} of {session.questions.length}
          </h1>
          <div className="progress-track" style={{ margin: "18px 0 10px" }}>
            <div className="progress-fill" style={{ width: progressWidth }} />
          </div>
          <p className="page-subtitle">
            You&apos;re on pace. Keep your focus on solving before checking choices.
          </p>
        </div>
        <article className="card timer-card">
          <p className="stat-label">Time remaining</p>
          <p className="stat-value">{timerValue}</p>
        </article>
      </div>

      <section className="session-layout">
        <article className="card question-card">
          <p className="question-prompt">{currentQuestion.prompt}</p>

          {choiceKeys.map((choiceKey) => {
            const label =
              currentQuestion[`choice_${choiceKey.toLowerCase() as "a" | "b" | "c" | "d"}`];
            const active = answers[currentQuestion.id] === choiceKey;

            return (
              <button
                key={choiceKey}
                className={`choice ${active ? "choice-active" : ""}`}
                type="button"
                onClick={() =>
                  setAnswers((currentAnswers) => ({
                    ...currentAnswers,
                    [currentQuestion.id]: choiceKey
                  }))
                }
              >
                <span className={`choice-badge ${active ? "choice-badge-active" : ""}`}>
                  {choiceKey}
                </span>
                <span className="choice-copy">{label}</span>
              </button>
            );
          })}

          <div className="session-hint">
            <p className="page-subtitle" style={{ margin: 0 }}>
              Tip: {currentQuestion.explanation.split(".")[0].replace(/^Because\s+/i, "")}.
            </p>
          </div>
        </article>

        <aside className="session-rail">
          <article className="card rail-card">
            <h2 className="card-title rail-title">Question navigator</h2>
            <p className="page-subtitle">
              Review flagged items after you finish this block.
            </p>
            <div className="nav-badges nav-badges-grid" style={{ marginTop: 16 }}>
              {session.questions.map((question, index) => {
                const isActive = index === currentIndex;
                const isAnswered = Boolean(answers[question.id]);

                return (
                  <button
                    key={question.id}
                    type="button"
                    className={isActive ? "nav-badge-active" : "nav-badge"}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to question ${index + 1}`}
                  >
                    {isAnswered ? "•" : index + 1}
                  </button>
                );
              })}
            </div>
            <p className="stat-label" style={{ marginTop: 16 }}>
              0 flagged • {remainingCount} remaining
            </p>
          </article>
        </aside>
      </section>

      <form action="/student/practice/session/submit" method="post" className="session-footer">
        <input type="hidden" name="sessionId" value={session.id} />
        <input type="hidden" name="answers" value={JSON.stringify(answers)} />
        <button
          className="button-secondary"
          type="button"
          onClick={() => setCurrentIndex((index) => Math.max(index - 1, 0))}
          disabled={currentIndex === 0}
        >
          Previous question
        </button>

        <div className="button-row session-footer-actions">
          <button className="button-secondary" type="submit">
            Submit session
          </button>
          <button
            className="button-primary"
            type="button"
            onClick={() =>
              setCurrentIndex((index) => Math.min(index + 1, session.questions.length - 1))
            }
            disabled={currentIndex === session.questions.length - 1}
          >
            Next question
          </button>
        </div>
      </form>
    </>
  );
}
