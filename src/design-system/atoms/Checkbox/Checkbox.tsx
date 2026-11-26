import type { ComponentPropsWithoutRef } from "react";

export interface CheckboxProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "className" | "type" | "checked" | "onChange" | "size"
> {
  /** Controlled checked state. */
  checked: boolean;
  /** Called with the next checked state when toggled. */
  onCheckedChange: (checked: boolean) => void;
  /** Marks the checkbox as invalid for accessibility and styling. */
  invalid?: boolean;
}

export function Checkbox({ checked, onCheckedChange, invalid = false, ...rest }: CheckboxProps) {
  return (
    <input
      {...rest}
      type="checkbox"
      checked={checked}
      aria-invalid={invalid || undefined}
      onChange={(event) => onCheckedChange(event.target.checked)}
      className="size-4 shrink-0 cursor-pointer rounded-sm accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}
