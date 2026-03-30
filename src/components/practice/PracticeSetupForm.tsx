"use client";

import { useMemo, useState } from "react";

const QUESTION_COUNT_OPTIONS = [10, 20, 50] as const;

type PracticeSetupFormProps = {
  defaultSubject?: "math" | "reading-writing";
};

const QUESTION_COUNT_COPY: Record<number, { title: string; label: string }> = {
  10: { title: "10-question check-in", label: "Quick reset" },
  20: { title: "20-question standard block", label: "Best default" },
  50: { title: "50-question deep dive", label: "Max coverage" }
};

export function PracticeSetupForm({
  defaultSubject = "math"
}: PracticeSetupFormProps) {
  const [subject, setSubject] = useState<"math" | "reading-writing">(defaultSubject);
  const [questionCount, setQuestionCount] = useState<(typeof QUESTION_COUNT_OPTIONS)[number]>(20);

  const summaryLine = useMemo(() => {
    const focus = subject === "math" ? "Heart of Algebra" : "Central ideas";
    return `${questionCount} questions • targets ${focus} • approved bank`;
  }, [questionCount, subject]);

  const previewRows = useMemo(
    () =>
      QUESTION_COUNT_OPTIONS.map((value) => ({
        key: value,
        title: QUESTION_COUNT_COPY[value].title,
        label: QUESTION_COUNT_COPY[value].label
      })),
    []
  );

  return (
    <form action="/student/practice/setup/start" method="post" className="setup-grid">
      <div className="setup-left-col">
        <article className="card setup-option-card">
          <p className="stat-label">Section</p>
          <div className="pill-row">
            <label className="radio-pill">
              <input
                type="radio"
                name="subject"
                value="math"
                checked={subject === "math"}
                onChange={() => setSubject("math")}
              />
              <span>Math</span>
            </label>
            <label className="radio-pill">
              <input
                type="radio"
                name="subject"
                value="reading-writing"
                checked={subject === "reading-writing"}
                onChange={() => setSubject("reading-writing")}
              />
              <span>Reading</span>
            </label>
          </div>
        </article>

        <article className="card setup-option-card">
          <p className="stat-label">Difficulty</p>
          <div className="pill-row">
            <label className="radio-pill">
              <input type="radio" name="difficulty" value="easy" defaultChecked />
              <span>Easy warm-up</span>
            </label>
          </div>
        </article>

        <article className="card setup-option-card">
          <p className="stat-label">Number of questions</p>
          <div className="pill-row">
            {QUESTION_COUNT_OPTIONS.map((value) => (
              <label className="radio-pill radio-pill-count" key={value}>
                <input
                  type="radio"
                  name="questionCount"
                  value={value}
                  checked={questionCount === value}
                  onChange={() => setQuestionCount(value)}
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </article>
      </div>

      <article className="card setup-summary-card">
        <h2 className="card-title">Session summary</h2>
        <p className="page-subtitle">{summaryLine}</p>
        <div className="setup-summary-note">
          <p className="page-subtitle setup-summary-note-copy">
            We&apos;ll pull approved question-bank items aligned to your current weak areas, with
            no live AI generation during practice.
          </p>
        </div>
        <p className="stat-label setup-focus-label">Recommended focus</p>
        <div className="inline-list setup-summary-list">
          <div className="inline-row">
            <span>{subject === "math" ? "Linear equations" : "Central ideas"}</span>
            <strong className="text-accent">Priority</strong>
          </div>
          <div className="inline-row">
            <span>{subject === "math" ? "Systems of equations" : "Transitions"}</span>
            <strong className="text-warning">Warm-up</strong>
          </div>
        </div>
        <button className="button-primary setup-start-button" type="submit">
          Start practice session
        </button>
      </article>

      <article className="card setup-preview-card">
        <h2 className="card-title">Question count preview</h2>
        <p className="page-subtitle">
          Students can choose a short 10-question check-in, a standard 20-question block, or a
          deeper 50-question session.
        </p>
        <div className="inline-list setup-preview-list">
          {previewRows.map((row) => (
            <div className="inline-row" key={row.key}>
              <span>{row.title}</span>
              <strong
                className={
                  row.key === 20
                    ? "text-accent"
                    : row.key === 10
                      ? ""
                      : ""
                }
                style={{
                  color:
                    row.key === 10
                      ? "var(--color-primary)"
                      : row.key === 20
                        ? "var(--color-accent)"
                        : "var(--color-primary)"
                }}
              >
                {row.label}
              </strong>
            </div>
          ))}
        </div>
      </article>

      <article className="card setup-expect-card">
        <h2 className="card-title">What to expect</h2>
        <p className="page-subtitle">
          Short sets keep momentum high, while longer sessions are grouped in results by question
          review so follow-up stays scannable.
        </p>
      </article>
    </form>
  );
}
