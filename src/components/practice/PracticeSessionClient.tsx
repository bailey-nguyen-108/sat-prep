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
  const progressWidth = `${Math.round(((currentIndex + 1) / session.questions.length) * 100)}%`;

  return (
    <>
      <div className="page-header">
        <div style={{ width: "min(760px, 100%)" }}>
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
            Stay focused, answer what you can, and submit when the full block feels solid.
          </p>
        </div>
        <article className="card timer-card">
          <p className="stat-label">Progress</p>
          <p className="stat-value">
            {answeredCount}/{session.questions.length}
          </p>
        </article>
      </div>

      <section className="session-layout">
        <article className="card question-card">
          <div>
            <p className="stat-label" style={{ marginBottom: 12 }}>
              {currentQuestion.subtopic}
            </p>
            <p style={{ fontSize: 28, lineHeight: 1.45, margin: 0 }}>{currentQuestion.prompt}</p>
          </div>

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
                <strong>{choiceKey}</strong>
                <span>{label}</span>
              </button>
            );
          })}

          <div className="card" style={{ background: "var(--color-bg)", padding: 20 }}>
            <p className="page-subtitle" style={{ margin: 0 }}>
              Pick your best answer now. You&apos;ll see explanations after the full session is
              submitted.
            </p>
          </div>
        </article>

        <aside className="card">
          <h2 className="card-title" style={{ fontSize: 24 }}>
            Question navigator
          </h2>
          <p className="page-subtitle">Jump around if you want, then submit when you&apos;re ready.</p>
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
          <p className="stat-label" style={{ marginTop: 14 }}>
            {answeredCount} answered • {session.questions.length - answeredCount} remaining
          </p>
        </aside>
      </section>

      <div className="button-row">
        <button
          className="button-secondary"
          type="button"
          onClick={() => setCurrentIndex((index) => Math.max(index - 1, 0))}
          disabled={currentIndex === 0}
        >
          Previous question
        </button>
        <button
          className="button-secondary"
          type="button"
          onClick={() =>
            setCurrentIndex((index) => Math.min(index + 1, session.questions.length - 1))
          }
          disabled={currentIndex === session.questions.length - 1}
        >
          Next question
        </button>
      </div>

      <form action="/student/practice/session/submit" method="post">
        <input type="hidden" name="sessionId" value={session.id} />
        <input type="hidden" name="answers" value={JSON.stringify(answers)} />
        <button className="button-primary" style={{ alignSelf: "flex-end" }}>
          Submit session
        </button>
      </form>
    </>
  );
}
