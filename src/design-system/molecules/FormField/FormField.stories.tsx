import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Input } from "../../atoms/Input/Input";
import { Select, type SelectOption } from "../../atoms/Select/Select";
import { Stack } from "../../atoms/Stack/Stack";
import { FormField } from "./FormField";

const OPTIONS: SelectOption[] = [
  { value: "", label: "All" },
  { value: "layer-1", label: "Layer 1" },
  { value: "defi", label: "DeFi" },
];

function InteractiveSearchField() {
  const [value, setValue] = useState("");
  return (
    <FormField label="Search" hint="Searches the loaded coins">
      {(controlProps) => (
        <Input
          {...controlProps}
          type="search"
          placeholder="Name or symbol"
          value={value}
          onValueChange={setValue}
        />
      )}
    </FormField>
  );
}

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  args: {
    label: "Search",
    hint: "Searches the loaded coins",
    children: (controlProps) => (
      <Input {...controlProps} type="search" placeholder="Name or symbol" value="" onValueChange={() => {}} />
    ),
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelect: Story = {
  render: () => (
    <FormField label="Category">
      {(controlProps) => (
        <Select {...controlProps} value="" options={OPTIONS} onValueChange={() => {}} />
      )}
    </FormField>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="md">
      <FormField label="With hint" hint="Filter by coin name or ticker symbol">
        {(controlProps) => (
          <Input {...controlProps} value="" placeholder="Bitcoin" onValueChange={() => {}} />
        )}
      </FormField>
      <FormField label="With error" error="Enter at least 2 characters">
        {(controlProps) => <Input {...controlProps} value="a" onValueChange={() => {}} />}
      </FormField>
      <FormField label="Disabled">
        {(controlProps) => (
          <Input {...controlProps} value="Bitcoin" disabled onValueChange={() => {}} />
        )}
      </FormField>
    </Stack>
  ),
};

export const Interactive: Story = {
  render: () => <InteractiveSearchField />,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Search");
    await userEvent.type(input, "eth");
    await expect(input).toHaveValue("eth");
  },
};
