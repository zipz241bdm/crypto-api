import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeTokens } from "./tokens";

const meta = {
  title: "Foundations/Typography",
  tags: ["!autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "180px 1fr",
  alignItems: "baseline",
  gap: "var(--spacing-md)",
  padding: "var(--spacing-xs) 0",
  borderBottom: "1px solid var(--color-border)",
};
const labelStyle = { color: "var(--color-text-muted)", fontSize: "var(--text-xs)" };
const SAMPLE = "The quick brown fox jumps over the lazy dog";

export const FontFamilies: Story = {
  render: () => (
    <div>
      {themeTokens("font-")
        .filter((token) => !token.name.startsWith("font-weight-"))
        .map((token) => (
          <div key={token.name} style={rowStyle}>
            <span style={labelStyle}>{token.name}</span>
            <span style={{ fontFamily: `var(--${token.name})`, fontSize: "var(--text-lg)" }}>
              {SAMPLE}
            </span>
          </div>
        ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div>
      {themeTokens("text-")
        .filter((token) => !token.name.includes("--"))
        .map((token) => (
          <div key={token.name} style={rowStyle}>
            <span style={labelStyle}>
              {token.name} ({token.value})
            </span>
            <span
              style={{
                fontSize: `var(--${token.name})`,
                lineHeight: `var(--${token.name}--line-height)`,
              }}
            >
              {SAMPLE}
            </span>
          </div>
        ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div>
      {themeTokens("font-weight-").map((token) => (
        <div key={token.name} style={rowStyle}>
          <span style={labelStyle}>
            {token.name} ({token.value})
          </span>
          <span style={{ fontWeight: `var(--${token.name})`, fontSize: "var(--text-lg)" }}>
            {SAMPLE}
          </span>
        </div>
      ))}
    </div>
  ),
};
