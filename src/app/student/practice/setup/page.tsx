import { redirect } from "next/navigation";
import { StudentShell } from "@/components/layout/StudentShell";
import { ensureQuestionBankSeeded, getAuthenticatedStudent } from "@/lib/student/repository";

export default async function PracticeSetupPage() {
  const auth = await getAuthenticatedStudent();

  if (!auth) {
    redirect("/login");
  }

  await ensureQuestionBankSeeded();

  return (
    <StudentShell activeTab="practice">
      <div>
        <h1 className="page-title">Build your next practice block</h1>
        <p className="page-subtitle">
          Choose a focused session, then we&apos;ll pull questions from the approved bank that
          best match your current level and weak areas.
        </p>
      </div>

      <form action="/student/practice/setup/start" method="post" className="card-grid-2">
        <div className="session-options">
          <article className="card">
            <p className="stat-label">Section</p>
            <div className="pill-row">
              <label className="radio-pill">
                <input type="radio" name="subject" value="math" defaultChecked />
                <span>Math</span>
              </label>
              <label className="radio-pill">
                <input type="radio" name="subject" value="reading-writing" />
                <span>Reading &amp; Writing</span>
              </label>
            </div>
          </article>
          <article className="card">
            <p className="stat-label">Difficulty</p>
            <div className="pill-row">
              <label className="radio-pill">
                <input type="radio" name="difficulty" value="easy" />
                <span>Easy warm-up</span>
              </label>
              <label className="radio-pill">
                <input type="radio" name="difficulty" value="medium" defaultChecked />
                <span>Medium build</span>
              </label>
              <label className="radio-pill">
                <input type="radio" name="difficulty" value="hard" />
                <span>Hard push</span>
              </label>
            </div>
          </article>
          <article className="card">
            <p className="stat-label">Mode</p>
            <div className="pill-row">
              <label className="radio-pill">
                <input type="radio" name="mode" value="timed" defaultChecked />
                <span>Timed</span>
              </label>
              <label className="radio-pill">
                <input type="radio" name="mode" value="untimed" />
                <span>Untimed</span>
              </label>
            </div>
          </article>
        </div>

        <article className="card">
          <h2 className="card-title">Session summary</h2>
          <p className="page-subtitle">10 questions • seeded from Supabase • tuned to your section choice</p>
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
              <span>20 math questions ready</span>
              <strong className="text-accent">Priority</strong>
            </div>
            <div className="inline-row">
              <span>20 reading-writing questions ready</span>
              <strong className="text-warning">Published</strong>
            </div>
          </div>
          <button className="button-primary" style={{ width: "100%", marginTop: 20 }}>
            Start practice session
          </button>
        </article>
      </form>

      <section className="card-grid-2">
        <article className="card">
          <h2 className="card-title">Question mix preview</h2>
          <p className="page-subtitle">
            The session pulls from the approved Supabase question bank, prioritizing the chosen
            difficulty and filling any gaps from the same subject.
          </p>
          <div className="inline-list" style={{ marginTop: 16 }}>
            <div className="inline-row">
              <span>Preferred difficulty</span>
              <strong style={{ color: "var(--color-primary)" }}>First priority</strong>
            </div>
            <div className="inline-row">
              <span>Fallback from same subject</span>
              <strong className="text-accent">Auto-filled</strong>
            </div>
          </div>
        </article>

        <article className="card">
          <h2 className="card-title">What to expect</h2>
          <p className="page-subtitle">
            After you submit, the app scores your answers, stores the session in Supabase, and
            recommends the next weak-area follow-up right away.
          </p>
          <div style={{ marginTop: 18 }}>
            <span className="info-pill">Adaptive but review-safe</span>
          </div>
        </article>
      </section>
    </StudentShell>
  );
}
