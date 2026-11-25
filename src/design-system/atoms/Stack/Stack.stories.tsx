import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../Card/Card";
import { Text } from "../Text/Text";
import { Stack } from "./Stack";

function DemoBox({ label }: { label: string }) {
  return (
    <Card padding="sm">
      <Text size="sm">{label}</Text>
    </Card>
  );
}

const meta = {
  title: "Atoms/Stack",
  component: Stack,
  args: {
    direction: "column",
    gap: "md",
    wrap: false,
    children: (
      <>
        <DemoBox label="First" />
        <DemoBox label="Second" />
        <DemoBox label="Third" />
      </>
    ),
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Directions: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack direction="column" gap="xs">
        <DemoBox label="Column 1" />
        <DemoBox label="Column 2" />
      </Stack>
      <Stack direction="row" gap="xs">
        <DemoBox label="Row 1" />
        <DemoBox label="Row 2" />
        <DemoBox label="Row 3" />
      </Stack>
    </Stack>
  ),
};

export const GapsAndAlignment: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack direction="row" gap="lg" justify="between" align="center">
        <DemoBox label="Start" />
        <DemoBox label="End" />
      </Stack>
      <Stack direction="row" gap="sm" wrap>
        <DemoBox label="Wrap 1" />
        <DemoBox label="Wrap 2" />
        <DemoBox label="Wrap 3" />
        <DemoBox label="Wrap 4" />
        <DemoBox label="Wrap 5" />
        <DemoBox label="Wrap 6" />
      </Stack>
    </Stack>
  ),
};
