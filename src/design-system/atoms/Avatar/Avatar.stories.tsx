import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { Avatar } from "./Avatar";

const SAMPLE_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="goldenrod"/><text x="32" y="41" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="ivory">B</text></svg>',
  );

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  args: {
    src: SAMPLE_AVATAR,
    alt: "Bitcoin",
    size: "md",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="lg" align="center">
      <Stack gap="xs" align="center">
        <Avatar src={SAMPLE_AVATAR} alt="Small coin avatar" size="sm" />
        <Text size="xs" tone="muted">
          sm
        </Text>
      </Stack>
      <Stack gap="xs" align="center">
        <Avatar src={SAMPLE_AVATAR} alt="Medium coin avatar" size="md" />
        <Text size="xs" tone="muted">
          md
        </Text>
      </Stack>
      <Stack gap="xs" align="center">
        <Avatar src={SAMPLE_AVATAR} alt="Large coin avatar" size="lg" />
        <Text size="xs" tone="muted">
          lg
        </Text>
      </Stack>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction="row" gap="lg" align="center">
      <Stack gap="xs" align="center">
        <Avatar src={SAMPLE_AVATAR} alt="" size="md" />
        <Text size="xs" tone="muted">
          Decorative (empty alt)
        </Text>
      </Stack>
      <Stack gap="xs" align="center">
        <Avatar src="" alt="Fallback surface" size="md" />
        <Text size="xs" tone="muted">
          Missing image
        </Text>
      </Stack>
    </Stack>
  ),
};
