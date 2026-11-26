import type { ReactNode } from "react";
import { Stack } from "../../atoms/Stack/Stack";
import { Text } from "../../atoms/Text/Text";

export interface EmptyStateProps {
  /** Optional heading above the message. */
  title?: string;
  /** Explanation shown when no items are available. */
  message: string;
  /** Optional call-to-action slot below the message. */
  action?: ReactNode;
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="grid place-items-center gap-sm py-xl text-center">
      <Stack gap="2xs" align="center">
        {title && (
          <Text size="lg" weight="semibold">
            {title}
          </Text>
        )}
        <Text tone="muted">{message}</Text>
      </Stack>
      {action}
    </div>
  );
}
