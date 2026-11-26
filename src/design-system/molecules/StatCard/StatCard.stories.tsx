import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "../../atoms/Grid/Grid";
import { StatCard } from "./StatCard";

const meta = {
  title: "Molecules/StatCard",
  component: StatCard,
  args: {
    label: "Total Market Cap",
    value: "$2.4T",
    change: { text: "+3.14%", tone: "success" },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Grid columns={1} smColumns={2} lgColumns={4} gap="md">
      <StatCard label="Coins Shown" value="50" />
      <StatCard label="Total Market Cap" value="$2.4T" change={{ text: "+2.85%", tone: "success" }} />
      <StatCard label="24h Change" value="$1.9T" change={{ text: "-1.42%", tone: "danger" }} />
      <StatCard label="Stablecoins" value="$165.0B" change={{ text: "0.00%", tone: "neutral" }} />
    </Grid>
  ),
};
