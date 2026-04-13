"use client";

import { useMemo, useState } from "react";
import { Flag } from "lucide-react";
import type { PracticeSessionDetail } from "@/lib/student/repository";
import type { AnswerChoice } from "@/lib/types/student";

const choiceKeys: AnswerChoice[] = ["A", "B", "C", "D"];

function startViewTransition(callback: () => void) {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition?.(
      callback
    );
    return;
  }

  callback();
}

export function PracticeSessionClient({ session }: { session: PracticeSessionDetail }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerChoice | undefined>>(() =>
    Object.fromEntries(
      session.questions.map((question) => [question.id, question.selected_choice ?? undefined])
    )
  );
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);

  const currentQuestion = session.questions[currentIndex];
  const answeredCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);
  const flaggedCount = flaggedIds.length;
  const remainingCount = session.questions.length - answeredCount;
  const progressWidth = `${Math.round(((currentIndex + 1) / session.questions.length) * 100)}%`;
  const timerValue = "11:42";
  const canGoBack = currentIndex > 0;
  const isLastQuestion = currentIndex === session.questions.length - 1;

  function goToIndex(nextIndex: number) {
    startViewTransition(() => {
      setCurrentIndex(Math.max(0, Math.min(nextIndex, session.questions.length - 1)));
    });
  }

  function handleChoiceSelect(choice: AnswerChoice) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: choice
    }));
    setFlaggedIds((currentFlags) => currentFlags.filter((id) => id !== currentQuestion.id));
  }

  function handleFlagForLater() {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: undefined
    }));
    setFlaggedIds((currentFlags) =>
      currentFlags.includes(currentQuestion.id)
        ? currentFlags
        : [...currentFlags, currentQuestion.id]
    );

    if (!isLastQuestion) {
      goToIndex(currentIndex + 1);
    }
  }

  const subjectEyebrow = session.subject === "math" ? "Math • Timed practice" : "Reading • Timed practice";

  return (
    <>
      <div className="page-header page-header-session">
        <div className="page-hero-copy session-hero-copy">
          <p className="stat-label session-eyebrow">{subjectEyebrow}</p>
          <h1 className="page-title session-page-title">
            Question {currentIndex + 1} of {session.questions.length}
          </h1>
          <div className="progress-track session-progress-track">
            <div className="progress-fill" style={{ width: progressWidth }} />
          </div>
          <p className="page-subtitle session-subtitle">
            You&apos;re on pace. Keep your focus on solving before checking choices.
          </p>
        </div>

        <article className="card timer-card timer-card-session">
          <p className="stat-label">Time remaining</p>
          <p className="stat-value">{timerValue}</p>
        </article>
      </div>

      <section className="session-layout">
        <article className="card question-card">
          <div className="question-stage" key={currentQuestion.id}>
            <p className="question-prompt">{currentQuestion.prompt}</p>

            <div className="choice-stack">
              {choiceKeys.map((choiceKey) => {
                const label =
                  currentQuestion[`choice_${choiceKey.toLowerCase() as "a" | "b" | "c" | "d"}`];
                const active = answers[currentQuestion.id] === choiceKey;

                return (
                  <button
                    key={choiceKey}
                    className={`choice ${active ? "choice-active" : ""}`}
                    type="button"
                    onClick={() => handleChoiceSelect(choiceKey)}
                  >
                    <span className={`choice-badge ${active ? "choice-badge-active" : ""}`}>
                      {choiceKey}
                    </span>
                    <span className="choice-copy">{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="session-hint">
              <p className="page-subtitle session-hint-copy">
                Tip: {currentQuestion.explanation.split(".")[0].replace(/^Because\\s+/i, "")}.
              </p>
            </div>
          </div>
        </article>

        <aside className="session-rail">
          <article className="card rail-card">
            <h2 className="card-title rail-title">Question navigator</h2>
            <p className="page-subtitle rail-copy">
              Review flagged items after you finish this block.
            </p>
            <div className="nav-badges nav-badges-grid nav-badges-session">
              {session.questions.map((question, index) => {
                const isFlagged = flaggedIds.includes(question.id);
                const isAnswered = Boolean(answers[question.id]);
                const isCurrent = index === currentIndex;

                return (
                  <button
                    key={question.id}
                    type="button"
                    className={[
                      "nav-badge",
                      isAnswered && !isFlagged ? "nav-badge-active" : "",
                      isFlagged ? "nav-badge-flagged" : "",
                      isCurrent ? "nav-badge-current" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => goToIndex(index)}
                    aria-label={`Go to question ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <p className="stat-label rail-summary-copy">
              {flaggedCount} flagged • {remainingCount} remaining
            </p>
            <div className="session-rail-snapshot">
              <p className="session-rail-snapshot-title">Session snapshot</p>
              <div className="inline-row">
                <span>Answered</span>
                <strong style={{ color: "var(--color-primary)" }}>{answeredCount}</strong>
              </div>
              <div className="inline-row">
                <span>Flagged</span>
                <strong className="text-accent">{flaggedCount}</strong>
              </div>
              <div className="inline-row">
                <span>Remaining</span>
                <strong>{remainingCount}</strong>
              </div>
            </div>
          </article>
        </aside>
      </section>

      <form action="/student/practice/session/submit" method="post" className="session-footer">
        <input type="hidden" name="sessionId" value={session.id} />
        <input type="hidden" name="answers" value={JSON.stringify(answers)} />
        <input type="hidden" name="flaggedQuestionIds" value={JSON.stringify(flaggedIds)} />

        <button
          className="button-secondary session-footer-button"
          type="button"
          onClick={() => goToIndex(currentIndex - 1)}
          disabled={!canGoBack}
        >
          Previous question
        </button>

        <button
          className="button-secondary session-flag-button"
          type="button"
          onClick={handleFlagForLater}
        >
          <Flag size={16} strokeWidth={2.25} />
          <span>Flag for later</span>
        </button>

        {isLastQuestion ? (
          <button className="button-primary session-footer-button" type="submit">
            Submit session
          </button>
        ) : (
          <button
            className="button-primary session-footer-button"
            type="button"
            onClick={() => goToIndex(currentIndex + 1)}
          >
            Next question
          </button>
        )}
      </form>
    </>
  );
}
