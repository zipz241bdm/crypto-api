import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";

export type InputSize = "sm" | "md";

export interface InputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "className" | "size" | "value" | "onChange" | "type"
> {
  /** Controlled input value. */
  value: string;
  /** Called with the updated string value on change. */
  onValueChange: (value: string) => void;
  /** HTML input type. */
  type?: "text" | "search" | "email" | "url" | "password";
  /** Input padding and font-size scale. */
  size?: InputSize;
  /** Marks the input as invalid for accessibility and border styling. */
  invalid?: boolean;
}

export const FIELD_BASE =
  "block w-full rounded-md border border-border-strong bg-surface-raised text-text transition-colors placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger";

export const FIELD_SIZES: Record<InputSize, string> = {
  sm: "px-sm py-2xs text-sm",
  md: "px-sm py-xs text-base",
};

export function Input({
  value,
  onValueChange,
  type = "text",
  size = "md",
  invalid = false,
  ...rest
}: InputProps) {
  return (
    <input
      autoComplete="off"
      {...rest}
      type={type}
      value={value}
      aria-invalid={invalid || undefined}
      onChange={(event) => onValueChange(event.target.value)}
      className={cx(FIELD_BASE, FIELD_SIZES[size])}
    />
  );
}
