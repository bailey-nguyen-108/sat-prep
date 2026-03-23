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
            Stay focused, answer what you can, and submit when the full block feels solid.
          </p>
        </div>
      </div>

      <section className="session-layout">
        <article className="card question-card">
          <div>
            <p className="stat-label" style={{ marginBottom: 12 }}>
              {currentQuestion.subtopic}
            </p>
            <p className="question-prompt">{currentQuestion.prompt}</p>
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
                <span className={`choice-badge ${active ? "choice-badge-active" : ""}`}>
                  {choiceKey}
                </span>
                <span className="choice-copy">{label}</span>
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

        <aside className="session-rail">
          <article className="card rail-card rail-card-compact">
            <p className="stat-label">Session snapshot</p>
            <p className="rail-stat">
              {answeredCount}/{session.questions.length}
            </p>
            <p className="page-subtitle">Questions answered so far in this block.</p>
            <div className="session-mini-grid">
              <div className="session-mini-card">
                <span className="session-mini-label">Remaining</span>
                <strong>{remainingCount}</strong>
              </div>
              <div className="session-mini-card">
                <span className="session-mini-label">Mode</span>
                <strong>{session.mode === "timed" ? "Timed" : "Untimed"}</strong>
              </div>
            </div>
          </article>

          <article className="card rail-card">
            <h2 className="card-title rail-title">Question navigator</h2>
            <p className="page-subtitle">
              Jump around if you want, then submit when you&apos;re ready.
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
              {answeredCount} answered • {remainingCount} remaining
            </p>
            <div className="session-note">
              Submit when the block is complete. Explanations and weak-area follow-up show up on
              the results screen.
            </div>
          </article>
        </aside>
      </section>

      <form action="/student/practice/session/submit" method="post" className="session-footer">
        <input type="hidden" name="sessionId" value={session.id} />
        <input type="hidden" name="answers" value={JSON.stringify(answers)} />
        <div className="session-footer-copy">
          <p className="stat-label">Session status</p>
          <p className="session-footer-title">
            {answeredCount} answered • {remainingCount} remaining
          </p>
        </div>
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
        <button className="button-primary">Submit session</button>
      </form>
    </>
  );
}
