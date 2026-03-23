import Link from "next/link";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/layout/StudentShell";
import { getAuthenticatedStudent, getDashboardData } from "@/lib/student/repository";

export default async function StudentHomePage() {
  const auth = await getAuthenticatedStudent();

  if (!auth) {
    redirect("/login");
  }

  const { currentStreak, latestCompleted, recentSessions } = await getDashboardData(auth.profile.id);
  const accuracy = latestCompleted?.score ?? 0;
  const reviewedCount = recentSessions.reduce(
    (total, session) => total + (session.correct_count ?? 0),
    0
  );
  const topWeakAreas = latestCompleted?.weak_subtopics ?? [];
  const streakLabel = currentStreak === 1 ? "session" : "sessions";

  return (
    <StudentShell activeTab="home">
      <div className="page-header">
        <div className="page-hero-copy">
          <h1 className="page-title">Good afternoon, {auth.profile.full_name ?? "Student"}.</h1>
          <p className="page-subtitle">
            {latestCompleted
              ? "Your last session is in. A focused follow-up block is the fastest next gain."
              : "Your question bank is ready. Start a first practice block and we’ll build momentum from there."}
          </p>
        </div>
        <Link className="button-primary" href="/student/practice/setup">
          Start targeted practice
        </Link>
      </div>

      <section className="card-grid-3">
        <article className="card card-primary metric-card">
          <p className="stat-label">Current streak</p>
          <p className="stat-value">
            {currentStreak} {streakLabel}
          </p>
        </article>
        <article className="card metric-card">
          <p className="stat-label">Latest accuracy</p>
          <p className="stat-value">{accuracy}%</p>
        </article>
        <article className="card card-accent metric-card">
          <p className="stat-label">Questions reviewed</p>
          <p className="stat-value">{reviewedCount}</p>
        </article>
      </section>

      <section className="card-grid-2">
        <article className="card dashboard-card">
          <h2 className="card-title">Next best session</h2>
          <p className="page-subtitle">
            {topWeakAreas.length > 0
              ? `Focus on ${topWeakAreas[0]} with a 10-question practice block pulled from the approved bank.`
              : "Start with a 10-question medium session so we can identify your strongest opportunities."}
          </p>
          <div style={{ marginTop: 16 }}>
            <span className="info-pill">Recommended now</span>
          </div>
        </article>
        <article className="card dashboard-card">
          <h2 className="card-title">Weak areas to revisit</h2>
          <div className="inline-list list-with-dividers">
            {topWeakAreas.length > 0 ? (
              topWeakAreas.map((topic, index) => (
                <div className="inline-row" key={topic}>
                  <span>{topic}</span>
                  <strong className={index === 0 ? "text-accent" : "text-warning"}>
                    Focus next
                  </strong>
                </div>
              ))
            ) : (
              <div className="inline-row">
                <span>No weak areas yet</span>
                <strong style={{ color: "var(--color-primary)" }}>Take first set</strong>
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="card-grid-2">
        <article className="card dashboard-card">
          <h2 className="card-title">Today&apos;s study plan</h2>
          <p className="page-subtitle">
            One 10-question targeted set, then a short review of any misses that show up on the
            results screen.
          </p>
          <div className="inline-list list-with-dividers" style={{ marginTop: 16 }}>
            <div className="inline-row">
              <span>Targeted Math Set</span>
              <strong style={{ color: "var(--color-primary)" }}>10 questions</strong>
            </div>
            <div className="inline-row">
              <span>Explanation Review</span>
              <strong className="text-accent">Follow-up after submit</strong>
            </div>
          </div>
        </article>
        <article className="card dashboard-card">
          <h2 className="card-title">Recent sessions</h2>
          <div className="inline-list list-with-dividers">
            {recentSessions.length > 0 ? (
              recentSessions.slice(0, 3).map((session) => (
                <div className="inline-row" key={session.id}>
                  <span>
                    {session.subject === "math" ? "Math" : "Reading & Writing"} •{" "}
                    {session.difficulty}
                  </span>
                  <strong style={{ color: "var(--color-primary)" }}>
                    {session.completed_at
                      ? `${session.correct_count ?? 0}/${session.question_count}`
                      : "In progress"}
                  </strong>
                </div>
              ))
            ) : (
              <div className="inline-row">
                <span>No sessions yet</span>
                <strong className="text-warning">Start one now</strong>
              </div>
            )}
          </div>
        </article>
      </section>
    </StudentShell>
  );
}
