import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Stack } from "../Stack/Stack";
import { Select, type SelectOption } from "./Select";

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: "", label: "All" },
  { value: "layer-1", label: "Layer 1" },
  { value: "layer-2", label: "Layer 2" },
  { value: "decentralized-finance-defi", label: "DeFi" },
];

const meta = {
  title: "Atoms/Select",
  component: Select,
  args: {
    value: "",
    options: CATEGORY_OPTIONS,
    size: "md",
    invalid: false,
    disabled: false,
    "aria-label": "Category",
    onValueChange: fn(),
  },
} satisfies Meta<typeof Select<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      <Select
        size="sm"
        value=""
        options={CATEGORY_OPTIONS}
        aria-label="Small select"
        onValueChange={() => {}}
      />
      <Select
        size="md"
        value="layer-1"
        options={CATEGORY_OPTIONS}
        aria-label="Medium select"
        onValueChange={() => {}}
      />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="sm">
      <Select
        value="layer-1"
        options={CATEGORY_OPTIONS}
        aria-label="Default select"
        onValueChange={() => {}}
      />
      <Select
        value=""
        invalid
        options={CATEGORY_OPTIONS}
        aria-label="Invalid select"
        onValueChange={() => {}}
      />
      <Select
        value="layer-2"
        disabled
        options={CATEGORY_OPTIONS}
        aria-label="Disabled select"
        onValueChange={() => {}}
      />
    </Stack>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <Select
        aria-label="Category"
        options={CATEGORY_OPTIONS}
        value={value}
        onValueChange={(next) => {
          setValue(next);
          args.onValueChange(next);
        }}
      />
    );
  },
  play: async ({ args, canvas, userEvent }) => {
    const select = canvas.getByRole("combobox", { name: "Category" });
    await userEvent.selectOptions(select, "layer-1");
    await expect(select).toHaveValue("layer-1");
    await expect(args.onValueChange).toHaveBeenCalledWith("layer-1");
  },
};
