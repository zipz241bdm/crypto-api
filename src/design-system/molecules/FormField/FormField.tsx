import { useId, type ReactNode } from "react";
import { Stack } from "../../atoms/Stack/Stack";
import { Text } from "../../atoms/Text/Text";

export interface FormFieldControlProps {
  /** Generated id linking the label to the form control. */
  id: string;
  /** Space-separated ids of hint and error messages, when present. */
  "aria-describedby": string | undefined;
  /** True when an error message is provided. */
  invalid: boolean;
}

export interface FormFieldProps {
  /** Visible field label. */
  label: string;
  /** Optional helper text shown below the control. */
  hint?: string;
  /** Optional validation error message. */
  error?: string;
  /** Render prop receiving accessibility attributes for the child input or select. */
  children: (controlProps: FormFieldControlProps) => ReactNode;
}

export function FormField({ label, hint, error, children }: FormFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <Stack gap="2xs">
      <label htmlFor={id} className="w-fit cursor-pointer">
        <Text as="span" size="sm" weight="medium">
          {label}
        </Text>
      </label>
      {children({ id, "aria-describedby": describedBy, invalid: Boolean(error) })}
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
