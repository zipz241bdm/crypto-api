import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { ErrorState } from "./ErrorState";

const meta = {
  title: "Molecules/ErrorState",
  component: ErrorState,
  args: {
    title: "An error occurred:",
    message: "Rate limit exceeded. Please wait a minute and try again.",
    retryLabel: "Try again",
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Try again" }));
    await expect(args.onRetry).toHaveBeenCalledTimes(1);
  },
};

export const WithoutRetry: Story = {
  args: {
    onRetry: undefined,
  },
};
