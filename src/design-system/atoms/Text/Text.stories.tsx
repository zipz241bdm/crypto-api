import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../Stack/Stack";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  args: {
    size: "md",
    tone: "default",
    weight: "normal",
    uppercase: false,
    numeric: false,
    children: "Bitcoin (BTC) market overview",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <Stack gap="xs">
      <Text tone="default">Default text</Text>
      <Text tone="muted">Muted text</Text>
      <Text tone="success">Success (+4.25%)</Text>
      <Text tone="danger">Danger (-2.10%)</Text>
      <Text tone="warning">Warning notice</Text>
      <Text tone="favorite">Favorite highlight</Text>
    </Stack>
  ),
};

export const SizesAndWeights: Story = {
  render: () => (
    <Stack gap="xs">
      <Text size="xs">Extra small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="md">Medium (md)</Text>
      <Text size="lg" weight="medium">
        Large medium (lg)
      </Text>
      <Text size="xl" weight="semibold">
        Extra large semibold (xl)
      </Text>
      <Text size="2xl" weight="bold">
        2xl bold
      </Text>
      <Text size="3xl" weight="semibold" numeric>
        $94,250.00
      </Text>
    </Stack>
  ),
};

export const Options: Story = {
  render: () => (
    <Stack gap="xs">
      <Text uppercase tone="muted" size="sm">
        btc
      </Text>
      <Text numeric align="right">
        1,234,567.89
      </Text>
      <Text as="small" size="xs" tone="muted">
        Last updated: Nov 25, 2026
      </Text>
    </Stack>
  ),
};
