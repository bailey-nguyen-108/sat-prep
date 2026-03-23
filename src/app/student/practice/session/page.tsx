import { StudentShell } from "@/components/layout/StudentShell";

const choices = [
  { key: "A", label: "3", active: true },
  { key: "B", label: "5" },
  { key: "C", label: "7" },
  { key: "D", label: "9" }
];

export default function PracticeSessionPage() {
  return (
    <StudentShell activeTab="practice">
      <div className="page-header">
        <div style={{ width: "min(720px, 100%)" }}>
          <p className="stat-label" style={{ color: "var(--color-primary)", marginBottom: 8 }}>
            Math • Timed practice
          </p>
          <h1 className="page-title">Question 7 of 12</h1>
          <div className="progress-track" style={{ margin: "18px 0 10px" }}>
            <div className="progress-fill" />
          </div>
          <p className="page-subtitle">
            You&apos;re on pace. Keep your focus on solving before checking choices.
          </p>
        </div>
        <article className="card timer-card">
          <p className="stat-label">Time remaining</p>
          <p className="stat-value">11:42</p>
        </article>
      </div>

      <section className="session-layout">
        <article className="card question-card">
          <p style={{ fontSize: 28, lineHeight: 1.4, margin: 0 }}>
            The system of equations 2x + y = 13 and x - y = 2 is solved by the ordered pair (x,
            y). What is the value of x?
          </p>
          {choices.map((choice) => (
            <button
              key={choice.key}
              className={`choice ${choice.active ? "choice-active" : ""}`}
              type="button"
            >
              <strong>{choice.key}</strong>
              <span>{choice.label}</span>
            </button>
          ))}
          <div className="card" style={{ background: "var(--color-bg)", padding: 20 }}>
            <p className="page-subtitle" style={{ margin: 0 }}>
              Tip: subtract the second equation from the first to eliminate y quickly.
            </p>
          </div>
        </article>

        <aside className="card">
          <h2 className="card-title" style={{ fontSize: 24 }}>
            Question navigator
          </h2>
          <p className="page-subtitle">Review flagged items after you finish this block.</p>
          <div className="nav-badges" style={{ marginTop: 16 }}>
            <span className="nav-badge-active">7</span>
            <span className="nav-badge">8</span>
            <span className="nav-badge">9</span>
          </div>
          <p className="stat-label" style={{ marginTop: 14 }}>
            1 flagged • 3 remaining
          </p>
        </aside>
      </section>

      <div className="button-row">
        <button className="button-secondary">Previous question</button>
        <button className="button-primary">Next question</button>
      </div>
    </StudentShell>
  );
}
