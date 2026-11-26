import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeMode } from "../types/dashboard";
import { ThemeContext, type ThemeContextValue } from "./ThemeContext";

const STORAGE_KEY = "theme";

function readStoredTheme(): ThemeMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(readStoredTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
  }, [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      toggleTheme: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
