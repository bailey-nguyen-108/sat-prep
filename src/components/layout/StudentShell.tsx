import { AppSidebar } from "@/components/layout/AppSidebar";

type StudentShellProps = {
  activeTab: "home" | "practice";
  children: React.ReactNode;
  pageClassName?: string;
};

export function StudentShell({ activeTab, children, pageClassName }: StudentShellProps) {
  return (
    <div className="app-shell">
      <AppSidebar activeTab={activeTab} />
      <main className={`page ${pageClassName ?? ""}`.trim()}>{children}</main>
    </div>
  );
}
