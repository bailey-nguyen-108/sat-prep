import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { AppSidebar } from "@/components/layout/AppSidebar";

vi.mock("@/app/login/actions", () => ({
  signOutStudent: vi.fn()
}));

describe("AppSidebar", () => {
  it("highlights the active tab", () => {
    render(<AppSidebar activeTab="practice" />);

    expect(screen.getByRole("link", { name: "Practice" })).toHaveClass("nav-item-active");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass("nav-item-active");
  });

  it("renders the SAT Prep brand", () => {
    render(<AppSidebar activeTab="home" />);

    expect(screen.getByText("SAT Prep")).toBeInTheDocument();
  });
});
