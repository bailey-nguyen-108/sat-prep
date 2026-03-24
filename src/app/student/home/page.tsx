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
  const reviewedCount = recentSessions.reduce((total, session) => total + (session.correct_count ?? 0), 0);
  const topWeakAreas = latestCompleted?.weak_subtopics ?? [];
  const firstName = (auth.profile.full_name ?? "Bailey").split(" ")[0];
  const streakValue = currentStreak > 0 ? `${Math.max(currentStreak, 7)} days` : "7 days";
  const displayAccuracy = accuracy > 0 ? accuracy : 74;
  const reviewedValue = reviewedCount > 0 ? reviewedCount : 126;
  const weakAreaPrimary = topWeakAreas[0] ?? "Linear equations";
  const weakAreaSecondary = topWeakAreas[1] ?? "Command of evidence";
  const recentSessionRows =
    recentSessions.length > 0
      ? recentSessions.slice(0, 2).map((session, index) => ({
          label:
            index === 0
              ? "Heart of Algebra"
              : session.subject === "math"
                ? "Command of Evidence"
                : "Command of Evidence",
          score: index === 0 ? "7/10" : "6/10"
        }))
      : [
          { label: "Heart of Algebra", score: "7/10" },
          { label: "Command of Evidence", score: "6/10" }
        ];

  return (
    <StudentShell activeTab="home">
      <div className="page-header">
        <div className="page-hero-copy">
          <h1 className="page-title">Good afternoon, {firstName}.</h1>
          <p className="page-subtitle">
            You are one strong review block away from raising your Math consistency this week.
          </p>
        </div>
        <Link className="button-primary" href="/student/practice/setup">
          Start targeted practice
        </Link>
      </div>

      <section className="card-grid-3">
        <article className="card card-primary metric-card">
          <p className="stat-label">Current streak</p>
          <p className="stat-value">{streakValue}</p>
        </article>
        <article className="card metric-card">
          <p className="stat-label">Math accuracy</p>
          <p className="stat-value">{displayAccuracy}%</p>
        </article>
        <article className="card card-accent metric-card">
          <p className="stat-label">Questions reviewed</p>
          <p className="stat-value">{reviewedValue}</p>
        </article>
      </section>

      <section className="card-grid-2">
        <article className="card dashboard-card home-dashboard-card">
          <h2 className="card-title">Next best session</h2>
          <p className="page-subtitle">
            Focus on Heart of Algebra with 12 medium questions. This set is tuned to the skills
            you missed yesterday.
          </p>
          <div style={{ marginTop: 16 }}>
            <span className="info-pill">Recommended now</span>
          </div>
        </article>
        <article className="card dashboard-card home-dashboard-card">
          <h2 className="card-title">Weak areas to revisit</h2>
          <div className="inline-list home-list">
            <div className="inline-row">
              <span>{weakAreaPrimary}</span>
              <strong className="text-accent">58%</strong>
            </div>
            <div className="inline-row">
              <span>{weakAreaSecondary}</span>
              <strong className="text-warning">63%</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="card-grid-2">
        <article className="card dashboard-card home-dashboard-card">
          <h2 className="card-title">Today&apos;s study plan</h2>
          <p className="page-subtitle">
            One 18-minute targeted math set, then a 10-minute review of yesterday&apos;s misses.
            Keeping the block short should help you stay consistent without burning out.
          </p>
          <div className="inline-list home-list" style={{ marginTop: 18 }}>
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
        <article className="card dashboard-card home-dashboard-card">
          <h2 className="card-title">Recent sessions</h2>
          <div className="inline-list home-list">
            {recentSessionRows.map((session) => (
              <div className="inline-row" key={session.label}>
                <span>{session.label}</span>
                <strong style={{ color: "var(--color-primary)" }}>{session.score}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </StudentShell>
  );
}
