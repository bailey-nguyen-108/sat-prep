import React from "react";
import { redirect } from "next/navigation";
import { BookOpenCheck } from "lucide-react";
import { getAuthenticatedStudent } from "@/lib/student/repository";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const auth = await getAuthenticatedStudent();

  if (auth) {
    redirect("/student/home");
  }

  const errorMessage = searchParams?.error;

  return (
    <main className="split-auth">
      <section className="auth-hero">
        <div className="brand">
          <div className="brand-mark">
            <BookOpenCheck size={24} />
          </div>
          <span className="brand-name">SAT Prep</span>
        </div>

        <div>
          <h1 className="display-title">Practice smarter. Score higher.</h1>
          <p className="display-subtitle">
            Target weak skills and build steady momentum for the SAT.
          </p>
        </div>

        <div className="auth-stats">
          <div className="auth-stat">
            <p className="stat-value">84%</p>
            <p className="stat-label">improve weak areas in 2 weeks</p>
          </div>
          <div className="auth-stat">
            <p className="stat-value">12m</p>
            <p className="stat-label">avg targeted review session</p>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div>
            <h2 className="card-title">Welcome back</h2>
            <p className="page-subtitle">
              Pick up where you left off and start a focused practice block.
            </p>
          </div>

          {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

          <form className="field-stack" method="post">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="input"
                type="email"
                defaultValue="student@school.edu"
                placeholder="student@school.edu"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="input"
                defaultValue="practice123"
                required
              />
            </div>

            <div className="meta-row">
              <span className="muted-copy">Keep me signed in</span>
              <span className="muted-link">Forgot password?</span>
            </div>

            <button className="button-primary" formAction="/auth/sign-in">
              Continue to dashboard
            </button>

            <button className="auth-footer-action" formAction="/auth/sign-up">
              New here? Create a student account in under 60 seconds.
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
