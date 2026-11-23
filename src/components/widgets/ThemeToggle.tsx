import { selectTheme, selectToggleTheme } from "../../store/selectors";
import { useAppStore } from "../../store/useAppStore";

export function ThemeToggle() {
  const theme = useAppStore(selectTheme);
  const toggleTheme = useAppStore(selectToggleTheme);

  return (
    <button type="button" onClick={toggleTheme} className="rounded border px-4 py-2">
      {theme === "light" ? "Switch to dark" : "Switch to light"}
    </button>
  );
}
