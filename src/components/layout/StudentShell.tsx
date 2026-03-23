import { AppSidebar } from "@/components/layout/AppSidebar";

type StudentShellProps = {
  activeTab: "home" | "practice" | "review" | "progress";
  children: React.ReactNode;
};

export function StudentShell({ activeTab, children }: StudentShellProps) {
  return (
    <div className="app-shell">
      <AppSidebar activeTab={activeTab} />
      <main className="page">{children}</main>
    </div>
  );
}
