import { describe, expect, it } from "vitest";
import { formatSupabaseAuthError } from "@/lib/supabase/auth-error";

describe("formatSupabaseAuthError", () => {
  it("maps raw network failures to a clear Supabase guidance message", () => {
    // Regression: ISSUE-001 — auth surfaced raw "fetch failed" on sign-in/sign-up
    // Found by /qa on 2026-04-13
    // Report: .gstack/qa-reports/qa-report-localhost-3000-2026-04-13.md
    expect(formatSupabaseAuthError(new Error("fetch failed"), "Unexpected auth error.")).toBe(
      "Supabase could not be reached. Check your .env.local Supabase URL and network connection, then try again."
    );
  });

  it("keeps the schema guidance for missing tables", () => {
    expect(
      formatSupabaseAuthError(new Error("Could not find the table public.practice_sessions"), "Unexpected auth error.")
    ).toBe("Run docs/supabase-schema.sql in the Supabase SQL editor, then try again.");
  });
});
