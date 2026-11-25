import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";
import { Spinner } from "./Spinner";

const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  args: {
    size: "md",
    tone: "default",
    label: "Loading...",
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <Spinner size="sm" label="Small spinner" />
      <Spinner size="md" label="Medium spinner" />
      <Spinner size="lg" label="Large spinner" />
    </Stack>
  ),
};

export const Tones: Story = {
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <Spinner tone="default" label="Default tone spinner" />
      <Button loading>Current tone in button</Button>
    </Stack>
  ),
};
