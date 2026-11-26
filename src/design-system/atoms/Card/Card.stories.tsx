import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "../Heading/Heading";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { Card } from "./Card";

const meta = {
  title: "Atoms/Card",
  component: Card,
  args: {
    variant: "outlined",
    padding: "md",
    as: "div",
    children: (
      <Stack gap="xs">
        <Heading level={3} size="md">
          Market Cap
        </Heading>
        <Text size="2xl" weight="semibold" numeric>
          $2.4T
        </Text>
      </Stack>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" gap="md" wrap>
      <Card variant="outlined">
        <Text weight="medium">Outlined card</Text>
      </Card>
      <Card variant="raised">
        <Text weight="medium">Raised card</Text>
      </Card>
    </Stack>
  ),
};

export const Paddings: Story = {
  render: () => (
    <Stack direction="row" gap="md" align="start" wrap>
      <Card padding="none">
        <Text size="sm">none</Text>
      </Card>
      <Card padding="sm">
        <Text size="sm">sm</Text>
      </Card>
      <Card padding="md">
        <Text size="sm">md</Text>
      </Card>
      <Card padding="lg">
        <Text size="sm">lg</Text>
      </Card>
    </Stack>
  ),
};
