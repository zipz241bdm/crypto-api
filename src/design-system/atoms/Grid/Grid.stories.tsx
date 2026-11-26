import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../Card/Card";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { Grid } from "./Grid";

function DemoCell({ label }: { label: string }) {
  return (
    <Card padding="sm">
      <Text size="sm">{label}</Text>
    </Card>
  );
}

const meta = {
  title: "Atoms/Grid",
  component: Grid,
  args: {
    columns: 3,
    gap: "md",
    children: (
      <>
        <DemoCell label="Item 1" />
        <DemoCell label="Item 2" />
        <DemoCell label="Item 3" />
      </>
    ),
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Columns: Story = {
  render: () => (
    <Stack gap="lg">
      <Grid columns={2} gap="sm">
        <DemoCell label="2 cols (1)" />
        <DemoCell label="2 cols (2)" />
      </Grid>
      <Grid columns={4} gap="sm">
        <DemoCell label="4 cols (1)" />
        <DemoCell label="4 cols (2)" />
        <DemoCell label="4 cols (3)" />
        <DemoCell label="4 cols (4)" />
      </Grid>
    </Stack>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Grid columns={1} smColumns={2} lgColumns={4} gap="md">
      <DemoCell label="KPI 1" />
      <DemoCell label="KPI 2" />
      <DemoCell label="KPI 3" />
      <DemoCell label="KPI 4" />
    </Grid>
  ),
};
