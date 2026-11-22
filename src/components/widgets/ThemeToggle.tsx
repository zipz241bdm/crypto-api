import { useTheme } from "../../hooks/useTheme";

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme} className="rounded border px-4 py-2">
      {mode === "light" ? "Switch to dark" : "Switch to light"}
    </button>
  );
}
