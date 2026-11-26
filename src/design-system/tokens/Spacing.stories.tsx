import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeTokens } from "./tokens";

const meta = {
  title: "Foundations/Spacing",
  tags: ["!autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "180px 1fr",
  alignItems: "center",
  gap: "var(--spacing-md)",
  padding: "var(--spacing-2xs) 0",
};
const labelStyle = { color: "var(--color-text-muted)", fontSize: "var(--text-xs)" };

export const SpacingScale: Story = {
  render: () => (
    <div>
      {themeTokens("spacing-").map((token) => (
        <div key={token.name} style={rowStyle}>
          <span style={labelStyle}>
            {token.name} ({token.value})
          </span>
          <div
            style={{
              width: `var(--${token.name})`,
              height: "var(--spacing-md)",
              background: "var(--color-primary)",
              borderRadius: "var(--radius-sm)",
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const LayoutWidths: Story = {
  render: () => (
    <div>
      {themeTokens("container-").map((token) => (
        <div key={token.name} style={{ ...rowStyle, gridTemplateColumns: "180px minmax(0, 1fr)" }}>
          <span style={labelStyle}>
            {token.name} ({token.value})
          </span>
          <div
            style={{
              width: `var(--${token.name})`,
              maxWidth: "100%",
              height: "var(--spacing-md)",
              background: "var(--color-surface-muted)",
              border: "1px solid var(--color-border-strong)",
              borderRadius: "var(--radius-sm)",
            }}
          />
        </div>
      ))}
    </div>
  ),
};
