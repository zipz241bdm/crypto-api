import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../Stack/Stack";
import { Badge } from "./Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  args: {
    tone: "neutral",
    size: "md",
    children: "Layer 1",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <Stack direction="row" gap="sm" wrap>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="success">+4.25%</Badge>
      <Badge tone="danger">-3.10%</Badge>
      <Badge tone="warning">Volatile</Badge>
      <Badge tone="info">Top 10</Badge>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Badge size="sm" tone="success">
        Small
      </Badge>
      <Badge size="md" tone="success">
        Medium
      </Badge>
    </Stack>
  ),
};
