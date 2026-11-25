import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../../utils/cx";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonTone = "default" | "favorite";

export interface IconButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "children" | "aria-label" | "aria-pressed"
> {
  /** Accessible label applied as `aria-label`. */
  label: string;
  /** Toggle state applied as `aria-pressed`. */
  pressed?: boolean;
  /** Button dimensions and icon size. */
  size?: IconButtonSize;
  /** Color treatment for default and pressed states. */
  tone?: IconButtonTone;
  /** Icon glyph or element rendered inside the button. */
  children: ReactNode;
}

const BASE =
  "inline-flex cursor-pointer items-center justify-center rounded-full leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-50";

const SIZES: Record<IconButtonSize, string> = {
  sm: "size-6 text-base",
  md: "size-8 text-xl",
  lg: "size-10 text-2xl",
};

const TONES: Record<IconButtonTone, string> = {
  default:
    "text-text-muted enabled:hover:bg-surface-muted enabled:hover:text-text aria-pressed:text-primary",
  favorite: "text-text-muted enabled:hover:text-favorite aria-pressed:text-favorite",
};

export function IconButton({
  label,
  pressed,
  size = "md",
  tone = "default",
  type = "button",
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      aria-label={label}
      aria-pressed={pressed}
      className={cx(BASE, SIZES[size], TONES[tone])}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
