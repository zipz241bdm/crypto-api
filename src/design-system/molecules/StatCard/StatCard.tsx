import { Card } from "../../atoms/Card/Card";
import { Stack } from "../../atoms/Stack/Stack";
import { Text, type TextTone } from "../../atoms/Text/Text";

export type StatCardChangeTone = "neutral" | "success" | "danger";

export interface StatCardChange {
  /** Pre-formatted change string (for example, `"+4.25%"`). */
  text: string;
  /** Semantic color tone for the change indicator. */
  tone: StatCardChangeTone;
}

export interface StatCardProps {
  /** Metric title displayed above the value. */
  label: string;
  /** Pre-formatted primary value. */
  value: string;
  /** Optional secondary change indicator. */
  change?: StatCardChange;
}

const CHANGE_TONES: Record<StatCardChangeTone, TextTone> = {
  neutral: "muted",
  success: "success",
  danger: "danger",
};

export function StatCard({ label, value, change }: StatCardProps) {
  return (
    <Card variant="raised" padding="md">
      <Stack gap="2xs">
        <Text size="sm" tone="muted">
          {label}
        </Text>
        <Text size="2xl" weight="semibold" numeric>
          {value}
        </Text>
        {change && (
          <Text size="sm" weight="medium" numeric tone={CHANGE_TONES[change.tone]}>
            {change.text}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
