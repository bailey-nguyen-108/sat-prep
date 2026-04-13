import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpenCheck } from "lucide-react";
import { getAuthenticatedStudent } from "@/lib/student/repository";

export default async function SignUpPage({
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
          <h1 className="display-title">Build your score jump.</h1>
          <p className="display-subtitle">
            Create your account, start a targeted practice block, and review exactly what to fix next.
          </p>
        </div>

        <div className="auth-stats">
          <div className="auth-stat">
            <p className="stat-value">10</p>
            <p className="stat-label">question check-ins to stay consistent</p>
          </div>
          <div className="auth-stat">
            <p className="stat-value">1</p>
            <p className="stat-label">clear next step after every session</p>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div>
            <h2 className="card-title">Create your student account</h2>
            <p className="page-subtitle">
              Set up your profile and go straight into your first focused practice block.
            </p>
          </div>

          {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

          <form className="field-stack" method="post" action="/auth/sign-up">
            <div className="field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                className="input"
                type="text"
                placeholder="Bailey Nguyen"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="input"
                type="email"
                placeholder="student@school.edu"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className="input" required />
            </div>

            <button className="button-primary" type="submit">
              Create account
            </button>

            <Link className="auth-footer-action" href="/login">
              Already have an account? Sign in instead.
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}
