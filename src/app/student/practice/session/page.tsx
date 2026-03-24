import { redirect } from "next/navigation";
import { PracticeSessionClient } from "@/components/practice/PracticeSessionClient";
import { StudentShell } from "@/components/layout/StudentShell";
import { findLatestSession, getAuthenticatedStudent, getPracticeSession } from "@/lib/student/repository";

export default async function PracticeSessionPage({
  searchParams
}: {
  searchParams?: { session?: string };
}) {
  const auth = await getAuthenticatedStudent();

  if (!auth) {
    redirect("/login");
  }

  const sessionId = searchParams?.session ?? (await findLatestSession(auth.profile.id, false));

  if (!sessionId) {
    redirect("/student/practice/setup");
  }

  const session = await getPracticeSession(sessionId, auth.profile.id);

  if (!session) {
    redirect("/student/practice/setup");
  }

  return (
    <StudentShell activeTab="practice">
      <PracticeSessionClient session={session} />
    </StudentShell>
  );
}
