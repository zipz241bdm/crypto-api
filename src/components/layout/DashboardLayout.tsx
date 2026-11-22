import type { ReactNode } from "react";

export interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="border-b p-4">
        <h1 className="text-xl font-bold">Crypto Dashboard</h1>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
