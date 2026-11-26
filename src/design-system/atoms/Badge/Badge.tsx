import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

export type BadgeTone = "neutral" | "success" | "danger" | "warning" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  /** Semantic color tone. */
  tone?: BadgeTone;
  /** Badge padding and font-size scale. */
  size?: BadgeSize;
  /** Badge content. */
  children: ReactNode;
}

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-surface-muted text-text",
  success: "bg-success-subtle text-success",
  danger: "bg-danger-subtle text-danger",
  warning: "bg-warning-subtle text-warning",
  info: "bg-info-subtle text-info",
};

const SIZES: Record<BadgeSize, string> = {
  sm: "px-xs py-2xs text-xs",
  md: "px-sm py-2xs text-sm",
};

export function Badge({ tone = "neutral", size = "md", children }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full font-medium whitespace-nowrap tabular-nums",
        TONES[tone],
        SIZES[size],
      )}
    >
      {children}
    </span>
  );
}
