import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { vi } from "vitest";

vi.mock("@/lib/student/repository", () => ({
  getAuthenticatedStudent: vi.fn(async () => null)
}));

describe("LoginPage", () => {
  it("renders the concise hero copy", async () => {
    render(await LoginPage({}));

    expect(screen.getByRole("heading", { name: "Practice smarter. Score higher." })).toBeInTheDocument();
    expect(
      screen.getByText("Target weak skills and build steady momentum for the SAT.")
    ).toBeInTheDocument();
  });

  it("renders the primary call to action", async () => {
    render(await LoginPage({}));

    expect(screen.getByRole("button", { name: "Continue to dashboard" })).toBeInTheDocument();
  });
});
