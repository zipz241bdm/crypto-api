import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Stack } from "../Stack/Stack";
import { IconButton } from "./IconButton";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  args: {
    label: "Favorite Bitcoin",
    pressed: false,
    size: "md",
    tone: "favorite",
    disabled: false,
    children: "☆",
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TonesAndSizes: Story = {
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <IconButton label="Small action" size="sm">
        ★
      </IconButton>
      <IconButton label="Medium action" size="md">
        ★
      </IconButton>
      <IconButton label="Large action" size="lg">
        ★
      </IconButton>
      <IconButton label="Favorite active" tone="favorite" pressed>
        ★
      </IconButton>
      <IconButton label="Default active" tone="default" pressed>
        ★
      </IconButton>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <IconButton label="Unpressed favorite" tone="favorite" pressed={false}>
        ☆
      </IconButton>
      <IconButton label="Pressed favorite" tone="favorite" pressed={true}>
        ★
      </IconButton>
      <IconButton label="Disabled favorite" tone="favorite" disabled>
        ☆
      </IconButton>
    </Stack>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [pressed, setPressed] = useState(false);
    return (
      <IconButton
        label="Favorite Bitcoin"
        tone="favorite"
        pressed={pressed}
        onClick={(event) => {
          setPressed((prev) => !prev);
          args.onClick?.(event);
        }}
      >
        {pressed ? "★" : "☆"}
      </IconButton>
    );
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Favorite Bitcoin" });
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button);
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
