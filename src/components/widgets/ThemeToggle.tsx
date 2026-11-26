import type { ThemeMode } from "../../types/dashboard";

export interface ThemeToggleProps {
  mode: ThemeMode;
  onToggle: () => void;
}

export function ThemeToggle({ mode, onToggle }: ThemeToggleProps) {
  return (
    <button type="button" onClick={onToggle} className="rounded border px-4 py-2">
      {mode === "light" ? "Switch to dark" : "Switch to light"}
    </button>
  );
}
