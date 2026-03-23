import React from "react";
import { BookOpenCheck } from "lucide-react";

export default function LoginPage() {
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

          <div className="field-stack">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" className="input" defaultValue="student@school.edu" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" className="input" defaultValue="••••••••••••" />
            </div>
          </div>

          <div className="meta-row">
            <span className="muted-copy">Keep me signed in</span>
            <span className="muted-link">Forgot password?</span>
          </div>

          <button className="button-primary">Continue to dashboard</button>
          <p className="muted-copy" style={{ textAlign: "center", margin: 0 }}>
            New here? Create a student account in under 60 seconds.
          </p>
        </div>
      </section>
    </main>
  );
}
