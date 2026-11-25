import { useId } from "react";
import { Stack } from "../../atoms/Stack/Stack";
import { Text } from "../../atoms/Text/Text";
import { cx } from "../../utils/cx";

export type SegmentedControlSize = "sm" | "md";

export interface SegmentedControlOption<T extends string = string> {
  /** Option value passed to `onValueChange`. */
  value: T;
  /** Visible segment label. */
  label: string;
  /** Disables selecting this segment. */
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string> {
  /** Visible label associated with the segment group via `aria-labelledby`. */
  label: string;
  /** Currently selected option value. */
  value: T;
  /** Available segment options. */
  options: SegmentedControlOption<T>[];
  /** Called when the user clicks a segment. */
  onValueChange: (value: T) => void;
  /** Segment button size scale. */
  size?: SegmentedControlSize;
}

const SIZES: Record<SegmentedControlSize, string> = {
  sm: "px-sm py-xs text-sm",
  md: "px-md py-xs text-base",
};

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onValueChange,
  size = "md",
}: SegmentedControlProps<T>) {
  const labelId = useId();

  return (
    <Stack gap="2xs">
      <Text as="span" id={labelId} size="sm" weight="medium">
        {label}
      </Text>
      <div
        role="group"
        aria-labelledby={labelId}
        className="inline-flex w-fit divide-x divide-border overflow-hidden rounded-md border border-border-strong bg-surface-raised"
      >
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              aria-pressed={isActive}
              onClick={() => onValueChange(option.value)}
              className={cx(
                "cursor-pointer font-medium transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
                SIZES[size],
                isActive
                  ? "bg-primary text-on-primary"
                  : "bg-surface-raised text-text enabled:hover:bg-surface-muted",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </Stack>
  );
}
