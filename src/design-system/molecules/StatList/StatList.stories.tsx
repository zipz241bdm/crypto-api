import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../atoms/Text/Text";
import { StatList } from "./StatList";

const meta = {
  title: "Molecules/StatList",
  component: StatList,
  args: {
    items: [
      { label: "Market cap", value: "$1.8T" },
      { label: "Fully diluted valuation", value: "$1.9T" },
      { label: "24h volume", value: "$42.5B" },
      {
        label: "Market cap change (24h)",
        value: (
          <Text as="span" size="sm" weight="medium" tone="success" numeric>
            +2.45%
          </Text>
        ),
      },
    ],
  },
} satisfies Meta<typeof StatList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
