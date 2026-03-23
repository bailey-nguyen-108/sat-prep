import { StudentShell } from "@/components/layout/StudentShell";

export default function StudentHomePage() {
  return (
    <StudentShell activeTab="home">
      <div className="page-header">
        <div>
          <h1 className="page-title">Good afternoon, Bailey.</h1>
          <p className="page-subtitle">
            You are one strong review block away from raising your Math consistency this week.
          </p>
        </div>
        <button className="button-primary">Start targeted practice</button>
      </div>

      <section className="card-grid-3">
        <article className="card card-primary">
          <p className="stat-label">Current streak</p>
          <p className="stat-value">7 days</p>
        </article>
        <article className="card">
          <p className="stat-label">Math accuracy</p>
          <p className="stat-value">74%</p>
        </article>
        <article className="card card-accent">
          <p className="stat-label">Questions reviewed</p>
          <p className="stat-value">126</p>
        </article>
      </section>

      <section className="card-grid-2">
        <article className="card">
          <h2 className="card-title">Next best session</h2>
          <p className="page-subtitle">
            Focus on Heart of Algebra with 12 medium questions. This set is tuned to the skills
            you missed yesterday.
          </p>
          <div style={{ marginTop: 16 }}>
            <span className="info-pill">Recommended now</span>
          </div>
        </article>
        <article className="card">
          <h2 className="card-title">Weak areas to revisit</h2>
          <div className="inline-list">
            <div className="inline-row">
              <span>Linear equations</span>
              <strong className="text-accent">58%</strong>
            </div>
            <div className="inline-row">
              <span>Command of evidence</span>
              <strong className="text-warning">63%</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="card-grid-2">
        <article className="card">
          <h2 className="card-title">Today&apos;s study plan</h2>
          <p className="page-subtitle">
            One 18-minute targeted math set, then a 10-minute review of yesterday&apos;s misses.
          </p>
          <div className="inline-list" style={{ marginTop: 16 }}>
            <div className="inline-row">
              <span>Targeted Math Set</span>
              <strong style={{ color: "var(--color-primary)" }}>18 min</strong>
            </div>
            <div className="inline-row">
              <span>Explanation Review</span>
              <strong className="text-accent">10 min</strong>
            </div>
          </div>
        </article>
        <article className="card">
          <h2 className="card-title">Recent sessions</h2>
          <div className="inline-list">
            <div className="inline-row">
              <span>Heart of Algebra</span>
              <strong style={{ color: "var(--color-primary)" }}>7/10</strong>
            </div>
            <div className="inline-row">
              <span>Command of Evidence</span>
              <strong className="text-warning">6/10</strong>
            </div>
          </div>
        </article>
      </section>
    </StudentShell>
  );
}
