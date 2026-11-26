import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../atoms/Button/Button";
import { Stack } from "../../atoms/Stack/Stack";
import { Text } from "../../atoms/Text/Text";
import { Panel } from "./Panel";

const meta = {
  title: "Molecules/Panel",
  component: Panel,
  args: {
    title: "Market Overview",
    headingLevel: 2,
    headingSize: "lg",
    variant: "outlined",
    padding: "md",
    children: <Text tone="muted">Panel body content rendered inside a semantic section.</Text>,
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack gap="md">
      <Panel
        title="Outlined Panel with Actions"
        variant="outlined"
        actions={
          <Button variant="secondary" size="sm">
            Refresh
          </Button>
        }
      >
        <Text size="sm">Supports an optional right-aligned action slot.</Text>
      </Panel>
      <Panel title="Raised Panel" variant="raised" headingSize="xl">
        <Text size="sm">Uses raised shadow styling and an xl heading.</Text>
      </Panel>
    </Stack>
  ),
};
