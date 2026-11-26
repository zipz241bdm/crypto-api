import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../Text/Text";
import { VisuallyHidden } from "./VisuallyHidden";

const meta = {
  title: "Atoms/VisuallyHidden",
  component: VisuallyHidden,
  args: {
    as: "span",
    children: "Favorite column",
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Text>
      Visible label alongside hidden text:
      <VisuallyHidden {...args} />
    </Text>
  ),
};
