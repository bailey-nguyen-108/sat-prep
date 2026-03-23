import { StudentShell } from "@/components/layout/StudentShell";

export default function PracticeSetupPage() {
  return (
    <StudentShell activeTab="practice">
      <div>
        <h1 className="page-title">Build your next practice block</h1>
        <p className="page-subtitle">
          Choose a focused session, then we&apos;ll pull questions from the approved bank that
          best match your current level and weak areas.
        </p>
      </div>

      <section className="card-grid-2">
        <div className="session-options">
          <article className="card">
            <p className="stat-label">Section</p>
            <div className="pill-row">
              <span className="pill-active">Math</span>
              <span className="pill">Reading &amp; Writing</span>
            </div>
          </article>
          <article className="card">
            <p className="stat-label">Difficulty</p>
            <div className="pill-row">
              <span className="pill">Easy warm-up</span>
            </div>
          </article>
          <article className="card">
            <p className="stat-label">Mode</p>
            <div className="pill-row">
              <span className="pill-active">Timed</span>
              <span className="pill">Untimed</span>
            </div>
          </article>
        </div>

        <article className="card">
          <h2 className="card-title">Session summary</h2>
          <p className="page-subtitle">12 questions • 18 minutes • targets Heart of Algebra</p>
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <div className="card" style={{ background: "#E8F3FE", border: 0, padding: 20 }}>
              <p className="page-subtitle" style={{ color: "var(--color-primary)", margin: 0 }}>
                We&apos;ll pull approved question-bank items aligned to your current weak areas,
                with no live AI generation during practice.
              </p>
            </div>
          </div>
          <div className="inline-list">
            <div className="inline-row">
              <span>Linear equations</span>
              <strong className="text-accent">Priority</strong>
            </div>
            <div className="inline-row">
              <span>Systems of equations</span>
              <strong className="text-warning">Warm-up</strong>
            </div>
          </div>
          <button className="button-primary" style={{ width: "100%", marginTop: 20 }}>
            Start practice session
          </button>
        </article>
      </section>

      <section className="card-grid-2">
        <article className="card">
          <h2 className="card-title">Question mix preview</h2>
          <p className="page-subtitle">
            A balanced set keeps the session feeling achievable while still pushing your weakest
            math concepts.
          </p>
          <div className="inline-list" style={{ marginTop: 16 }}>
            <div className="inline-row">
              <span>Heart of Algebra</span>
              <strong style={{ color: "var(--color-primary)" }}>6 questions</strong>
            </div>
            <div className="inline-row">
              <span>Systems &amp; graphs</span>
              <strong className="text-accent">4 questions</strong>
            </div>
          </div>
        </article>

        <article className="card">
          <h2 className="card-title">What to expect</h2>
          <p className="page-subtitle">
            You&apos;ll start with moderate-difficulty questions, then move into a short follow-up
            cluster if your results show a clear weak area.
          </p>
          <div style={{ marginTop: 18 }}>
            <span className="info-pill">Adaptive but review-safe</span>
          </div>
        </article>
      </section>
    </StudentShell>
  );
}
