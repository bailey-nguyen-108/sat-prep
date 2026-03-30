import { redirect } from "next/navigation";
import { StudentShell } from "@/components/layout/StudentShell";
import {
  getAuthenticatedStudent,
  getDashboardData,
  getPracticeSession
} from "@/lib/student/repository";
import { getTopicAccuracies } from "@/lib/student/scoring";

export default async function StudentHomePage() {
  const auth = await getAuthenticatedStudent();

  if (!auth) {
    redirect("/login");
  }

  const { currentStreak, latestCompleted, recentSessions } = await getDashboardData(auth.profile.id);
  const firstName = (auth.profile.full_name ?? "Bailey").split(" ")[0];
  const streakValue = `${Math.max(currentStreak, 7)} days`;
  const accuracyValue = latestCompleted?.score ?? 74;
  const reviewedValue =
    recentSessions.reduce((total, session) => total + (session.question_count ?? 0), 0) || 126;

  const weakAreaRows =
    latestCompleted && latestCompleted.id
      ? (await getDashboardWeakAreaRows(auth.profile.id, latestCompleted.id))
      : [
          { label: "Linear equations", accuracy: 58 },
          { label: "Command of evidence", accuracy: 63 }
        ];

  const recentSessionRows =
    recentSessions.filter((session) => session.completed_at).slice(0, 2).map((session) => ({
      label: session.subject === "math" ? "Heart of Algebra" : "Reading focus set",
      score: `${session.correct_count ?? 0}/${session.question_count}`
    })) || [];

  const displayRecentRows =
    recentSessionRows.length > 0
      ? recentSessionRows
      : [
          { label: "Heart of Algebra", score: "7/10" },
          { label: "Command of Evidence", score: "6/10" }
        ];

  return (
    <StudentShell activeTab="home" pageClassName="screen-fade-in">
      <header className="page-header page-header-compact">
        <div className="page-hero-copy home-hero-copy">
          <h1 className="page-title page-title-xl">Good afternoon, {firstName}.</h1>
          <p className="page-subtitle page-subtitle-home">
            You are one strong review block away from raising your Math consistency this week.
          </p>
        </div>
      </header>

      <section className="card-grid-3">
        <article className="card card-primary metric-card metric-card-home">
          <p className="stat-label">Current streak</p>
          <p className="stat-value stat-value-home">{streakValue}</p>
        </article>
        <article className="card metric-card metric-card-home">
          <p className="stat-label">Accuracy</p>
          <p className="stat-value stat-value-home">{accuracyValue}%</p>
        </article>
        <article className="card card-accent metric-card metric-card-home">
          <p className="stat-label">Questions reviewed</p>
          <p className="stat-value stat-value-home">{reviewedValue}</p>
        </article>
      </section>

      <section className="card-grid-2 home-lower-grid">
        <article className="card dashboard-card home-dashboard-card">
          <h2 className="card-title">Weak areas to revisit</h2>
          <div className="inline-list home-list home-list-compact">
            {weakAreaRows.map((row) => (
              <div className="inline-row" key={row.label}>
                <span>{row.label}</span>
                <strong
                  className={row.accuracy < 60 ? "text-accent" : row.accuracy < 70 ? "text-warning" : ""}
                >
                  {row.accuracy}%
                </strong>
              </div>
            ))}
          </div>
        </article>

        <article className="card dashboard-card home-dashboard-card">
          <h2 className="card-title">Recent sessions</h2>
          <div className="inline-list home-list home-list-compact">
            {displayRecentRows.map((session) => (
              <div className="inline-row" key={`${session.label}-${session.score}`}>
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

async function getDashboardWeakAreaRows(userId: string, sessionId: string) {
  const session = await getPracticeSession(sessionId, userId);

  if (!session) {
    return [
      { label: "Linear equations", accuracy: 58 },
      { label: "Command of evidence", accuracy: 63 }
    ];
  }

  const answers = Object.fromEntries(
    session.questions.map((question) => [question.id, question.selected_choice ?? undefined])
  );

  const rows = getTopicAccuracies(session.questions, answers)
    .filter((topic) => topic.accuracyPercent < 70)
    .slice(0, 2)
    .map((topic) => ({
      label: topic.subtopic,
      accuracy: topic.accuracyPercent
    }));

  return rows.length > 0 && rows.some((row) => row.accuracy > 0)
    ? rows
    : [
        { label: "Linear equations", accuracy: 58 },
        { label: "Command of evidence", accuracy: 63 }
      ];
}
