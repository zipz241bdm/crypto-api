import { cx } from "../../utils/cx";

export type SwatchSize = "sm" | "md";

export interface SwatchProps {
  /** CSS color value or token reference (e.g., `var(--color-primary)`). */
  color: string;
  /** Swatch dot diameter. */
  size?: SwatchSize;
}

const SIZES: Record<SwatchSize, string> = {
  sm: "size-3",
  md: "size-4",
};

export function Swatch({ color, size = "sm" }: SwatchProps) {
  return (
    <span
      aria-hidden="true"
      style={{ backgroundColor: color }}
      className={cx("inline-block shrink-0 rounded-full border border-border", SIZES[size])}
    />
  );
}
