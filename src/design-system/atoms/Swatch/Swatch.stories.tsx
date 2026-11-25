import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { Swatch } from "./Swatch";

const meta = {
  title: "Atoms/Swatch",
  component: Swatch,
  args: {
    color: "var(--color-primary)",
    size: "sm",
  },
} satisfies Meta<typeof Swatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <Stack direction="row" gap="xs" align="center">
        <Swatch color="var(--color-primary)" size="sm" />
        <Text size="sm">sm</Text>
      </Stack>
      <Stack direction="row" gap="xs" align="center">
        <Swatch color="var(--color-primary)" size="md" />
        <Text size="sm">md</Text>
      </Stack>
    </Stack>
  ),
};

export const ChartTokens: Story = {
  render: () => (
    <Stack direction="row" gap="md" wrap>
      <Stack direction="row" gap="xs" align="center">
        <Swatch color="var(--color-chart-positive)" />
        <Text size="sm">Positive</Text>
      </Stack>
      <Stack direction="row" gap="xs" align="center">
        <Swatch color="var(--color-chart-negative)" />
        <Text size="sm">Negative</Text>
      </Stack>
      <Stack direction="row" gap="xs" align="center">
        <Swatch color="var(--color-chart-neutral)" />
        <Text size="sm">Neutral</Text>
      </Stack>
      <Stack direction="row" gap="xs" align="center">
        <Swatch color="var(--color-chart-other)" />
        <Text size="sm">Other</Text>
      </Stack>
    </Stack>
  ),
};
