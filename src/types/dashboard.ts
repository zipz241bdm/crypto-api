export interface KpiItem {
  id: string;
  title: string;
  value: string;
  change?: number | null;
}

export type ThemeMode = "light" | "dark";

export interface CategoryOption {
  id: string;
  name: string;
  coinIds: string[];
}
