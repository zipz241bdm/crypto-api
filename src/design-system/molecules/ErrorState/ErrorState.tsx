import { Button } from "../../atoms/Button/Button";
import { Stack } from "../../atoms/Stack/Stack";
import { Text } from "../../atoms/Text/Text";

export interface ErrorStateProps {
  /** Heading displayed above the error description. */
  title?: string;
  /** Human-readable error message. */
  message: string;
  /** Label for the retry action button. */
  retryLabel?: string;
  /** Optional retry callback; hides the button when omitted. */
  onRetry?: () => void;
}

export function ErrorState({
  title = "An error occurred:",
  message,
  retryLabel = "Try again",
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="grid place-items-center gap-sm py-xl text-center">
      <Stack gap="2xs" align="center">
        <Text size="2xl" weight="semibold" tone="danger">
          {title}
        </Text>
        <Text>{message}</Text>
      </Stack>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
