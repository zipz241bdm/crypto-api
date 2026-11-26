import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Input } from "../../atoms/Input/Input";
import { Select, type SelectOption } from "../../atoms/Select/Select";
import { CheckboxField } from "../../molecules/CheckboxField/CheckboxField";
import { FormField } from "../../molecules/FormField/FormField";
import { FilterBar } from "./FilterBar";

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: "", label: "All" },
  { value: "layer-1", label: "Layer 1" },
  { value: "defi", label: "DeFi" },
];

function InteractiveFilterBar({ onReset }: { onReset: () => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const isDirty = search !== "" || category !== "" || favoritesOnly;

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setFavoritesOnly(false);
    onReset();
  };

  return (
    <FilterBar
      label="Coin filters"
      columns={4}
      resetDisabled={!isDirty}
      onReset={handleReset}
    >
      <FormField label="Search" hint="Searches the loaded coins">
        {(controlProps) => (
          <Input
            {...controlProps}
            type="search"
            placeholder="Name or symbol"
            value={search}
            onValueChange={setSearch}
          />
        )}
      </FormField>
      <FormField label="Category">
        {(controlProps) => (
          <Select
            {...controlProps}
            options={CATEGORY_OPTIONS}
            value={category}
            onValueChange={setCategory}
          />
        )}
      </FormField>
      <CheckboxField
        label="Favorites only"
        checked={favoritesOnly}
        onCheckedChange={setFavoritesOnly}
      />
    </FilterBar>
  );
}

const meta = {
  title: "Organisms/FilterBar",
  component: FilterBar,
  args: {
    label: "Coin filters",
    columns: 4,
    resetDisabled: true,
    resetLabel: "Reset filters",
    onReset: fn(),
    children: (
      <>
        <FormField label="Search">
          {(controlProps) => (
            <Input
              {...controlProps}
              type="search"
              placeholder="Name or symbol"
              value=""
              onValueChange={() => {}}
            />
          )}
        </FormField>
        <FormField label="Category">
          {(controlProps) => (
            <Select
              {...controlProps}
              options={CATEGORY_OPTIONS}
              value=""
              onValueChange={() => {}}
            />
          )}
        </FormField>
        <CheckboxField
          label="Favorites only"
          checked={false}
          onCheckedChange={() => {}}
        />
      </>
    ),
  },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ResetEnabled: Story = {
  args: {
    resetDisabled: false,
  },
};

export const Interactive: Story = {
  render: (args) => <InteractiveFilterBar onReset={args.onReset} />,
  play: async ({ args, canvas, userEvent }) => {
    const searchInput = canvas.getByLabelText("Search");
    const resetButton = canvas.getByRole("button", { name: "Reset filters" });

    await expect(resetButton).toBeDisabled();
    await userEvent.type(searchInput, "btc");
    await expect(resetButton).toBeEnabled();

    await userEvent.click(resetButton);
    await expect(searchInput).toHaveValue("");
    await expect(resetButton).toBeDisabled();
    await expect(args.onReset).toHaveBeenCalledTimes(1);
  },
};
