import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner/Spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "className"> {
  /** Visual button style. */
  variant?: ButtonVariant;
  /** Button padding and font-size scale. */
  size?: ButtonSize;
  /** Shows a spinner and disables interaction while busy. */
  loading?: boolean;
  /** Stretches the button to fill its container width. */
  fullWidth?: boolean;
}

const BASE =
  "inline-flex cursor-pointer select-none items-center justify-center gap-xs rounded-md border font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-primary text-on-primary enabled:hover:bg-primary-hover",
  secondary: "border-border-strong bg-surface-raised text-text enabled:hover:bg-surface-muted",
  ghost: "border-transparent bg-transparent text-text enabled:hover:bg-surface-muted",
  danger: "border-transparent bg-danger text-on-danger enabled:hover:bg-danger-hover",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-sm py-2xs text-sm",
  md: "px-md py-xs text-base",
  lg: "px-lg py-sm text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full")}
    >
      {loading && <Spinner size="sm" tone="current" />}
      {children}
    </button>
  );
}
