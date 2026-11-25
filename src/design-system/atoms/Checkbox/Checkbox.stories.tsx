import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  args: {
    checked: false,
    invalid: false,
    disabled: false,
    "aria-label": "Favorites only",
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <Stack direction="row" gap="lg" wrap>
      <Stack direction="row" gap="xs" align="center">
        <Checkbox checked={false} onCheckedChange={() => {}} aria-label="Unchecked" />
        <Text size="sm">Unchecked</Text>
      </Stack>
      <Stack direction="row" gap="xs" align="center">
        <Checkbox checked={true} onCheckedChange={() => {}} aria-label="Checked" />
        <Text size="sm">Checked</Text>
      </Stack>
      <Stack direction="row" gap="xs" align="center">
        <Checkbox checked={false} invalid onCheckedChange={() => {}} aria-label="Invalid" />
        <Text size="sm">Invalid</Text>
      </Stack>
      <Stack direction="row" gap="xs" align="center">
        <Checkbox checked={true} disabled onCheckedChange={() => {}} aria-label="Disabled" />
        <Text size="sm">Disabled</Text>
      </Stack>
    </Stack>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return (
      <Checkbox
        aria-label="Favorites only"
        checked={checked}
        onCheckedChange={(next) => {
          setChecked(next);
          args.onCheckedChange(next);
        }}
      />
    );
  },
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Favorites only" });
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};
