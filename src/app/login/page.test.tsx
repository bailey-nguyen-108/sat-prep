import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/login/page";

describe("LoginPage", () => {
  it("renders the concise hero copy", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: "Practice smarter. Score higher." })).toBeInTheDocument();
    expect(
      screen.getByText("Target weak skills and build steady momentum for the SAT.")
    ).toBeInTheDocument();
  });

  it("renders the primary call to action", () => {
    render(<LoginPage />);

    expect(screen.getByRole("button", { name: "Continue to dashboard" })).toBeInTheDocument();
  });
});
