import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Stack } from "../../atoms/Stack/Stack";
import { SegmentedControl, type SegmentedControlOption } from "./SegmentedControl";

const CHART_OPTIONS: SegmentedControlOption[] = [
  { value: "bar", label: "Bar" },
  { value: "pie", label: "Pie" },
];

const RANGE_OPTIONS: SegmentedControlOption[] = [
  { value: "24h", label: "24h" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d", disabled: true },
];

function ControlledSegmentedControl({
  initialValue,
  onValueChange,
}: {
  initialValue: string;
  onValueChange: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <SegmentedControl
      label="Chart type"
      value={value}
      options={CHART_OPTIONS}
      onValueChange={(next) => {
        setValue(next);
        onValueChange(next);
      }}
    />
  );
}

const meta = {
  title: "Molecules/SegmentedControl",
  component: SegmentedControl,
  args: {
    label: "Chart type",
    value: "bar",
    options: CHART_OPTIONS,
    size: "md",
    onValueChange: fn(),
  },
} satisfies Meta<typeof SegmentedControl<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SizesAndStates: Story = {
  render: () => (
    <Stack gap="md">
      <SegmentedControl
        label="Small size"
        size="sm"
        value="bar"
        options={CHART_OPTIONS}
        onValueChange={() => {}}
      />
      <SegmentedControl
        label="With disabled option"
        size="md"
        value="24h"
        options={RANGE_OPTIONS}
        onValueChange={() => {}}
      />
    </Stack>
  ),
};

export const Interactive: Story = {
  render: (args) => (
    <ControlledSegmentedControl initialValue={args.value} onValueChange={args.onValueChange} />
  ),
  play: async ({ args, canvas, userEvent }) => {
    const barButton = canvas.getByRole("button", { name: "Bar" });
    const pieButton = canvas.getByRole("button", { name: "Pie" });

    await expect(barButton).toHaveAttribute("aria-pressed", "true");
    await expect(pieButton).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(pieButton);

    await expect(barButton).toHaveAttribute("aria-pressed", "false");
    await expect(pieButton).toHaveAttribute("aria-pressed", "true");
    await expect(args.onValueChange).toHaveBeenCalledWith("pie");
  },
};
