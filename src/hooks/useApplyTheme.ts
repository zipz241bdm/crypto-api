import { useEffect } from "react";
import { selectTheme } from "../store/selectors";
import { useAppStore } from "../store/useAppStore";

export function useApplyTheme(): void {
  const theme = useAppStore(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
}
