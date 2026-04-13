import React from "react";
import Link from "next/link";
import { BookOpenCheck, LogOut } from "lucide-react";

type SidebarTab = "home" | "practice" | "review" | "progress";

const navItems: Array<{ key: SidebarTab; label: string; href: string }> = [
  { key: "home", label: "Home", href: "/student/home" },
  { key: "practice", label: "Practice", href: "/student/practice/setup" },
  { key: "review", label: "Review", href: "/student/review/results" },
  { key: "progress", label: "Progress", href: "/student/home" }
];

export function AppSidebar({ activeTab }: { activeTab: SidebarTab }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-mark">
            <BookOpenCheck size={22} />
          </div>
          <span className="brand-name">SAT Prep</span>
        </div>

        <nav className="nav" aria-label="Student navigation">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`nav-item ${item.key === activeTab ? "nav-item-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer-card">
        <div className="sidebar-footer-copy">
          <p className="sidebar-footer-name">Bailey Nguyen</p>
          <p className="sidebar-footer-meta">Target 1400 • SAT in 19 days</p>
        </div>
        <span className="sidebar-footer-pill">7 day streak</span>
        <form action="/auth/sign-out" method="post">
          <button className="sidebar-logout" type="submit">
            <LogOut size={16} aria-hidden="true" />
            <span>Log out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
