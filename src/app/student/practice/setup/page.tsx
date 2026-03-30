import { redirect } from "next/navigation";
import { StudentShell } from "@/components/layout/StudentShell";
import { PracticeSetupForm } from "@/components/practice/PracticeSetupForm";
import { ensureQuestionBankSeeded, getAuthenticatedStudent } from "@/lib/student/repository";

export default async function PracticeSetupPage() {
  const auth = await getAuthenticatedStudent();

  if (!auth) {
    redirect("/login");
  }

  await ensureQuestionBankSeeded();

  return (
    <StudentShell activeTab="practice" pageClassName="screen-fade-in">
      <div className="page-hero-copy setup-hero-copy">
        <h1 className="page-title page-title-xl">Build your next practice block</h1>
        <p className="page-subtitle">
          Choose a focused session, then we&apos;ll pull questions from the approved bank that best
          match your current level and weak areas.
        </p>
      </div>

      <PracticeSetupForm />
    </StudentShell>
  );
}
