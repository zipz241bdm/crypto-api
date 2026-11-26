import { Button } from "../../design-system";
import { selectTheme, selectToggleTheme } from "../../store/selectors";
import { useAppStore } from "../../store/useAppStore";

export function ThemeToggle() {
  const theme = useAppStore(selectTheme);
  const toggleTheme = useAppStore(selectToggleTheme);

  return (
    <Button variant="secondary" size="sm" onClick={toggleTheme}>
      {theme === "light" ? "Switch to dark" : "Switch to light"}
    </Button>
  );
}
