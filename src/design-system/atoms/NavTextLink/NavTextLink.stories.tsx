import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../Stack/Stack";
import { NavTextLink } from "./NavTextLink";

const meta = {
  title: "Atoms/NavTextLink",
  component: NavTextLink,
  args: {
    to: "/",
    end: true,
    children: "Dashboard",
  },
} satisfies Meta<typeof NavTextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <Stack direction="row" gap="md">
      <NavTextLink to="/" end>
        Active (Dashboard)
      </NavTextLink>
      <NavTextLink to="/coin/bitcoin">Inactive (Bitcoin)</NavTextLink>
    </Stack>
  ),
};
