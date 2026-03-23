import React from "react";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

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

      <form action="/auth/sign-out" method="post">
        <button className="sidebar-signout" type="submit">
          Sign out
        </button>
      </form>
    </aside>
  );
}
