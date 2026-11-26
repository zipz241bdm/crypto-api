import { useId } from "react";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { Stack } from "../../atoms/Stack/Stack";
import { Text } from "../../atoms/Text/Text";
import { cx } from "../../utils/cx";

export interface CheckboxFieldProps {
  /** Visible label next to the checkbox. */
  label: string;
  /** Controlled checked state. */
  checked: boolean;
  /** Called with the next checked state when toggled. */
  onCheckedChange: (checked: boolean) => void;
  /** Optional helper text shown below the checkbox. */
  hint?: string;
  /** Optional validation error message. */
  error?: string;
  /** Disables interaction. */
  disabled?: boolean;
  /** Marks the checkbox as invalid even without an error message. */
  invalid?: boolean;
}

export function CheckboxField({
  label,
  checked,
  onCheckedChange,
  hint,
  error,
  disabled = false,
  invalid = false,
}: CheckboxFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const isInvalid = invalid || Boolean(error);
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <Stack gap="2xs">
      <label
        htmlFor={id}
        className={cx(
          "inline-flex w-fit items-center gap-xs py-xs",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          invalid={isInvalid}
          aria-describedby={describedBy}
        />
        <Text as="span" size="sm" weight="medium" tone={disabled ? "muted" : "default"}>
          {label}
        </Text>
      </label>
      {hint && (
        <Text id={hintId} size="xs" tone="muted">
          {hint}
        </Text>
      )}
      {error && (
        <Text id={errorId} size="xs" tone="danger" role="alert">
          {error}
        </Text>
      )}
    </Stack>
  );
}
