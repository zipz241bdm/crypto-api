import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { ROUTES } from "../../router/paths";
import { ThemeToggle } from "../widgets/ThemeToggle";

export interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b p-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">Crypto Dashboard</h1>
          <nav aria-label="Main">
            <NavLink
              to={ROUTES.home}
              end
              className={({ isActive }) => `hover:underline ${isActive ? "font-semibold" : ""}`}
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
        <ThemeToggle />
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
