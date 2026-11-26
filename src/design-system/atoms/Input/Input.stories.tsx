import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Stack } from "../Stack/Stack";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  args: {
    value: "",
    type: "search",
    size: "md",
    invalid: false,
    disabled: false,
    placeholder: "Name or symbol",
    "aria-label": "Search coins",
    onValueChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      <Input
        size="sm"
        value=""
        placeholder="Small input"
        aria-label="Small input"
        onValueChange={() => {}}
      />
      <Input
        size="md"
        value=""
        placeholder="Medium input"
        aria-label="Medium input"
        onValueChange={() => {}}
      />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="sm">
      <Input value="Bitcoin" aria-label="Default input" onValueChange={() => {}} />
      <Input value="Invalid" invalid aria-label="Invalid input" onValueChange={() => {}} />
      <Input value="Disabled" disabled aria-label="Disabled input" onValueChange={() => {}} />
    </Stack>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <Input
        type="search"
        placeholder="Name or symbol"
        aria-label="Search coins"
        value={value}
        onValueChange={(next) => {
          setValue(next);
          args.onValueChange(next);
        }}
      />
    );
  },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("searchbox", { name: "Search coins" });
    await userEvent.type(input, "btc");
    await expect(input).toHaveValue("btc");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("btc");
  },
};
