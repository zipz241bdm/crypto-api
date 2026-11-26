import type { ReactNode } from "react";
import type { ThemeMode } from "../../types/dashboard";

export interface DashboardLayoutProps {
  mode: ThemeMode;
  children: ReactNode;
}

export function DashboardLayout({ mode, children }: DashboardLayoutProps) {
  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <header className="border-b p-4">
          <h1 className="text-xl font-bold">Crypto Dashboard</h1>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </div>
  );
}
