import { StudentShell } from "@/components/layout/StudentShell";

export default function SessionResultsPage() {
  return (
    <StudentShell activeTab="review">
      <div>
        <p className="stat-label" style={{ color: "var(--color-primary)", marginBottom: 8 }}>
          Session complete
        </p>
        <h1 className="page-title">You finished strong.</h1>
        <p className="page-subtitle">
          Your latest results point to a narrow set of math skills that are worth another round
          right now.
        </p>
      </div>

      <section className="card-grid-2">
        <article className="card card-primary">
          <p className="stat-label">Session score</p>
          <p className="stat-value" style={{ fontSize: 52 }}>
            9 / 12
          </p>
          <p className="stat-label">75% accuracy • best pace this week</p>
        </article>

        <article className="card">
          <h2 className="card-title">Weak-area follow-up</h2>
          <p className="page-subtitle">
            We found two weak sub-topics below 70% accuracy. Your next recommended session should
            pull approved questions from those areas.
          </p>
          <div className="inline-list" style={{ marginTop: 16 }}>
            <div className="inline-row">
              <span>Linear equations</span>
              <strong className="text-accent">58%</strong>
            </div>
          </div>
        </article>
      </section>

      <div className="button-row" style={{ justifyContent: "flex-start" }}>
        <button className="button-primary">Practice weak areas</button>
        <button className="button-secondary">Review explanations</button>
      </div>

      <section className="card-grid-2">
        <article className="card">
          <h2 className="card-title">Question breakdown</h2>
          <div className="inline-list">
            <div className="inline-row">
              <span>Question 4</span>
              <strong className="text-accent">Needs review</strong>
            </div>
            <div className="inline-row">
              <span>Question 8</span>
              <strong className="text-success">Correct</strong>
            </div>
          </div>
        </article>

        <article className="card">
          <h2 className="card-title">Momentum outlook</h2>
          <p className="page-subtitle">
            Your pace is improving faster than your accuracy, which usually means the next score
            gain comes from a short explanation review before another targeted set.
          </p>
          <div style={{ marginTop: 18 }}>
            <span className="info-pill">Best next move: review then retry</span>
          </div>
        </article>
      </section>
    </StudentShell>
  );
}
