import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Stack } from "../../atoms/Stack/Stack";
import { CheckboxField } from "./CheckboxField";

function ControlledCheckboxField({
  initialChecked = false,
  onCheckedChange,
}: {
  initialChecked?: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState(initialChecked);
  return (
    <CheckboxField
      label="Favorites only"
      checked={checked}
      onCheckedChange={(next) => {
        setChecked(next);
        onCheckedChange(next);
      }}
    />
  );
}

const meta = {
  title: "Molecules/CheckboxField",
  component: CheckboxField,
  args: {
    label: "Favorites only",
    checked: false,
    disabled: false,
    invalid: false,
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <Stack gap="sm">
      <CheckboxField label="Unchecked" checked={false} onCheckedChange={() => {}} />
      <CheckboxField
        label="Checked with hint"
        checked={true}
        hint="Only show coins you have starred"
        onCheckedChange={() => {}}
      />
      <CheckboxField
        label="With error"
        checked={false}
        error="Selection is required"
        onCheckedChange={() => {}}
      />
      <CheckboxField label="Disabled" checked={true} disabled onCheckedChange={() => {}} />
    </Stack>
  ),
};

export const Interactive: Story = {
  render: (args) => (
    <ControlledCheckboxField initialChecked={args.checked} onCheckedChange={args.onCheckedChange} />
  ),
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByLabelText("Favorites only");
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};
