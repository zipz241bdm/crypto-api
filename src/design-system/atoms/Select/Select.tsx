import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";
import { FIELD_BASE, FIELD_SIZES, type InputSize } from "../Input/Input";

export interface SelectOption<T extends string = string> {
  /** Option value submitted on selection. */
  value: T;
  /** Human-readable option text. */
  label: string;
}

export interface SelectProps<T extends string> extends Omit<
  ComponentPropsWithoutRef<"select">,
  "className" | "size" | "value" | "onChange" | "children"
> {
  /** Currently selected option value. */
  value: T;
  /** Called with the newly selected option value. */
  onValueChange: (value: T) => void;
  /** List of selectable options. */
  options: SelectOption<T>[];
  /** Select padding and font-size scale. */
  size?: InputSize;
  /** Marks the select as invalid for accessibility and border styling. */
  invalid?: boolean;
}

export function Select<T extends string>({
  value,
  onValueChange,
  options,
  size = "md",
  invalid = false,
  ...rest
}: SelectProps<T>) {
  return (
    <select
      {...rest}
      value={value}
      aria-invalid={invalid || undefined}
      onChange={(event) => onValueChange(event.target.value as T)}
      className={cx(FIELD_BASE, FIELD_SIZES[size], "cursor-pointer")}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
