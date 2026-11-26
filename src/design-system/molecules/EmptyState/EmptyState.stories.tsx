import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../atoms/Button/Button";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  args: {
    message: "No coins match your filters.",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitleAndAction: Story = {
  args: {
    title: "No favorites yet",
    message: "Star coins from the table to quickly track them here.",
    action: (
      <Button variant="secondary" size="sm">
        Reset filters
      </Button>
    ),
  },
};
