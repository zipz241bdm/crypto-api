import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../atoms/Button/Button";
import { NavTextLink } from "../../atoms/NavTextLink/NavTextLink";
import { Stack } from "../../atoms/Stack/Stack";
import { AppHeader } from "./AppHeader";

const meta = {
  title: "Organisms/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Crypto Dashboard",
    nav: (
      <Stack direction="row" gap="md">
        <NavTextLink to="/" end>
          Dashboard
        </NavTextLink>
        <NavTextLink to="/coin/bitcoin">Bitcoin</NavTextLink>
      </Stack>
    ),
    actions: (
      <Button variant="secondary" size="sm">
        Switch to dark
      </Button>
    ),
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: {
    nav: undefined,
    actions: undefined,
  },
};
