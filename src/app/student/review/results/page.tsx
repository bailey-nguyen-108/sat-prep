import Link from "next/link";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/layout/StudentShell";
import { findLatestSession, getAuthenticatedStudent, getPracticeSession } from "@/lib/student/repository";

export default async function SessionResultsPage({
  searchParams
}: {
  searchParams?: { session?: string };
}) {
  const auth = await getAuthenticatedStudent();

  if (!auth) {
    redirect("/login");
  }

  const sessionId = searchParams?.session ?? (await findLatestSession(auth.profile.id, true));

  if (!sessionId) {
    redirect("/student/practice/setup");
  }

  const session = await getPracticeSession(sessionId, auth.profile.id);

  if (!session || !session.completed_at) {
    redirect(`/student/practice/session?session=${sessionId}`);
  }

  const accuracy = session.question_count
    ? Math.round(((session.correct_count ?? 0) / session.question_count) * 100)
    : 0;

  return (
    <StudentShell activeTab="review">
      <div>
        <p className="stat-label" style={{ color: "var(--color-primary)", marginBottom: 8 }}>
          Session complete
        </p>
        <h1 className="page-title">You finished strong.</h1>
        <p className="page-subtitle">
          Your latest results are saved. Review what missed, then launch a follow-up session while
          the patterns are still fresh.
        </p>
      </div>

      <section className="card-grid-2">
        <article className="card card-primary">
          <p className="stat-label">Session score</p>
          <p className="stat-value" style={{ fontSize: 52 }}>
            {session.correct_count ?? 0} / {session.question_count}
          </p>
          <p className="stat-label">{accuracy}% accuracy • stored in Supabase</p>
        </article>

        <article className="card">
          <h2 className="card-title">Weak-area follow-up</h2>
          <p className="page-subtitle">
            We found the sub-topics that missed most often. Your next recommended session can pull
            approved bank questions from those areas.
          </p>
          <div className="inline-list" style={{ marginTop: 16 }}>
            {session.weak_subtopics.length > 0 ? (
              session.weak_subtopics.map((topic, index) => (
                <div className="inline-row" key={topic}>
                  <span>{topic}</span>
                  <strong className={index === 0 ? "text-accent" : "text-warning"}>
                    Focus next
                  </strong>
                </div>
              ))
            ) : (
              <div className="inline-row">
                <span>No major weak area found</span>
                <strong className="text-success">Ready to level up</strong>
              </div>
            )}
          </div>
        </article>
      </section>

      <div className="button-row" style={{ justifyContent: "flex-start" }}>
        <Link className="button-primary" href="/student/practice/setup">
          Practice weak areas
        </Link>
        <Link className="button-secondary" href="/student/home">
          Back to dashboard
        </Link>
      </div>

      <section className="card-grid-2">
        <article className="card">
          <h2 className="card-title">Question breakdown</h2>
          <div className="inline-list">
            {session.questions.slice(0, 6).map((question) => (
              <div className="inline-row" key={question.id}>
                <span>
                  Question {question.position} • {question.subtopic}
                </span>
                <strong className={question.is_correct ? "text-success" : "text-accent"}>
                  {question.is_correct ? "Correct" : "Needs review"}
                </strong>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <h2 className="card-title">Momentum outlook</h2>
          <p className="page-subtitle">
            {session.weak_subtopics.length > 0
              ? "Your best next move is a targeted retry in the weak areas above, followed by a short explanation review."
              : "You cleared this set cleanly enough to push into a harder practice block next."}
          </p>
          <div style={{ marginTop: 18 }}>
            <span className="info-pill">
              {session.weak_subtopics.length > 0
                ? "Best next move: review then retry"
                : "Best next move: increase difficulty"}
            </span>
          </div>
        </article>
      </section>
    </StudentShell>
  );
}
