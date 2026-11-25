import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../Stack/Stack";
import { TextLink } from "./TextLink";

const meta = {
  title: "Atoms/TextLink",
  component: TextLink,
  args: {
    to: "/coin/bitcoin",
    tone: "primary",
    weight: "normal",
    underline: "hover",
    children: "Bitcoin",
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack gap="sm">
      <TextLink to="/coin/bitcoin" tone="primary">
        Primary tone (hover underline)
      </TextLink>
      <TextLink to="/coin/bitcoin" tone="default" weight="medium">
        Default tone (medium weight)
      </TextLink>
      <TextLink to="/" underline="always">
        Always underlined
      </TextLink>
    </Stack>
  ),
};
