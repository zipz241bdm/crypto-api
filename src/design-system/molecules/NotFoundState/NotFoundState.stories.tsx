import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextLink } from "../../atoms/TextLink/TextLink";
import { NotFoundState } from "./NotFoundState";

const meta = {
  title: "Molecules/NotFoundState",
  component: NotFoundState,
  args: {
    title: "Coin not found",
    message: 'There is no coin with the id "unknown-coin".',
    headingLevel: 2,
  },
} satisfies Meta<typeof NotFoundState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    title: "Page not found",
    message: "The page you are looking for does not exist.",
    action: <TextLink to="/">Back to dashboard</TextLink>,
  },
};
