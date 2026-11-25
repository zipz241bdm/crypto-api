import { cx } from "../../utils/cx";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerTone = "default" | "current";

export interface SpinnerProps {
  /** Spinner diameter and border thickness. */
  size?: SpinnerSize;
  /** Spinner stroke color treatment. */
  tone?: SpinnerTone;
  /** Accessible status label announced to screen readers. */
  label?: string;
}

const SIZES: Record<SpinnerSize, string> = {
  sm: "size-4 border-2",
  md: "size-8 border-4",
  lg: "size-12 border-4",
};

const TONES: Record<SpinnerTone, string> = {
  default: "border-border border-t-primary",
  current: "border-current/30 border-t-current",
};

export function Spinner({ size = "md", tone = "default", label }: SpinnerProps) {
  const ring = (
    <span
      aria-hidden="true"
      className={cx(
        "inline-block animate-spin rounded-full motion-reduce:animate-none",
        SIZES[size],
        TONES[tone],
      )}
    />
  );

  if (label === undefined) return ring;

  return (
    <span role="status" className="inline-flex">
      {ring}
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
}
