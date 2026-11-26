import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeTokens } from "./tokens";

const meta = {
  title: "Foundations/Radius and Shadows",
  tags: ["!autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const wrapStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "var(--spacing-lg)",
  padding: "var(--spacing-md)",
};
const boxStyle = {
  width: "120px",
  height: "80px",
  display: "grid",
  placeItems: "center",
  background: "var(--color-surface-raised)",
  border: "1px solid var(--color-border)",
  fontSize: "var(--text-xs)",
  textAlign: "center" as const,
};

export const Radius: Story = {
  render: () => (
    <div style={wrapStyle}>
      {themeTokens("radius-").map((token) => (
        <div key={token.name} style={{ ...boxStyle, borderRadius: `var(--${token.name})` }}>
          {token.name}
          <br />
          {token.value}
        </div>
      ))}
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={wrapStyle}>
      {themeTokens("shadow-").map((token) => (
        <div
          key={token.name}
          style={{
            ...boxStyle,
            borderRadius: "var(--radius-md)",
            boxShadow: `var(--${token.name})`,
          }}
        >
          {token.name}
        </div>
      ))}
    </div>
  ),
};
