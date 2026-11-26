export const POSITIVE_COLOR = "var(--color-chart-positive)";
export const NEGATIVE_COLOR = "var(--color-chart-negative)";
export const NEUTRAL_COLOR = "var(--color-chart-neutral)";
export const OTHER_COLOR = "var(--color-chart-other)";

export const POSITIVE_SHADES = [
  "var(--color-chart-positive-1)",
  "var(--color-chart-positive-2)",
  "var(--color-chart-positive-3)",
  "var(--color-chart-positive-4)",
  "var(--color-chart-positive-5)",
  "var(--color-chart-positive-6)",
  "var(--color-chart-positive-7)",
];

export const NEGATIVE_SHADES = [
  "var(--color-chart-negative-1)",
  "var(--color-chart-negative-2)",
  "var(--color-chart-negative-3)",
  "var(--color-chart-negative-4)",
  "var(--color-chart-negative-5)",
  "var(--color-chart-negative-6)",
  "var(--color-chart-negative-7)",
];

export const NEUTRAL_SHADES = [
  "var(--color-chart-neutral-1)",
  "var(--color-chart-neutral-2)",
  "var(--color-chart-neutral-3)",
  "var(--color-chart-neutral-4)",
  "var(--color-chart-neutral-5)",
  "var(--color-chart-neutral-6)",
  "var(--color-chart-neutral-7)",
];

export const CHART_SURFACE = "var(--color-surface-raised)";
export const CHART_TEXT = "var(--color-text)";
export const CHART_GRID = "var(--color-border)";
export const CHART_AXIS = "var(--color-text-muted)";
export const CHART_LABEL = "var(--color-chart-label)";
export const CHART_LABEL_OUTLINE = "var(--color-chart-label-outline)";

export const CHART_TOOLTIP_STYLE = {
  backgroundColor: CHART_SURFACE,
  color: CHART_TEXT,
  borderColor: CHART_GRID,
  borderRadius: "var(--radius-md)",
} as const;
