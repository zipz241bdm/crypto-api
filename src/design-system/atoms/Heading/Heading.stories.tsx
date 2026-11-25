import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../Stack/Stack";
import { Heading } from "./Heading";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  args: {
    level: 2,
    children: "Market Overview",
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Levels: Story = {
  render: () => (
    <Stack gap="sm">
      <Heading level={1}>Heading level 1 (default 2xl)</Heading>
      <Heading level={2}>Heading level 2 (default xl)</Heading>
      <Heading level={3}>Heading level 3 (default lg)</Heading>
      <Heading level={4}>Heading level 4 (default md)</Heading>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      <Heading level={2} size="2xl">
        Size 2xl on h2
      </Heading>
      <Heading level={2} size="xl">
        Size xl on h2
      </Heading>
      <Heading level={2} size="lg">
        Size lg on h2
      </Heading>
      <Heading level={2} size="md">
        Size md on h2
      </Heading>
      <Heading level={2} size="sm">
        Size sm on h2
      </Heading>
    </Stack>
  ),
};
