import type { Meta, StoryObj } from "@storybook/react-vite";
import { TOKENS, themeTokens } from "./tokens";

const meta = {
  title: "Foundations/Colors",
  tags: ["!autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "var(--spacing-md)",
};
const cardStyle = {
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  overflow: "hidden",
  background: "var(--color-surface-raised)",
  color: "var(--color-text)",
  fontSize: "var(--text-xs)",
};
const captionStyle = { padding: "var(--spacing-xs)", display: "grid", gap: "var(--spacing-2xs)" };
const mutedStyle = { color: "var(--color-text-muted)", wordBreak: "break-all" as const };

function ColorCard({ name, value, dark }: { name: string; value: string; dark?: string }) {
  return (
    <div style={cardStyle}>
      <div style={{ height: "56px", background: `var(--${name})` }} />
      <div style={captionStyle}>
        <strong style={{ fontSize: "var(--text-sm)" }}>{name}</strong>
        <span style={mutedStyle}>light: {value}</span>
        {dark && <span style={mutedStyle}>dark: {dark}</span>}
      </div>
    </div>
  );
}

function Heading({ children }: { children: string }) {
  return (
    <h3 style={{ margin: "var(--spacing-lg) 0 var(--spacing-sm)", fontSize: "var(--text-lg)" }}>
      {children}
    </h3>
  );
}

const darkValues = new Map(TOKENS.dark.map((token) => [token.name, token.value]));

export const SemanticColors: Story = {
  render: () => (
    <div>
      <p style={mutedStyle}>
        Components use only these tokens. Switching the theme redefines them, nothing else changes.
      </p>
      <Heading>Semantic</Heading>
      <div style={gridStyle}>
        {themeTokens("color-")
          .filter((token) => !token.name.startsWith("color-chart-"))
          .map((token) => (
            <ColorCard key={token.name} {...token} dark={darkValues.get(token.name)} />
          ))}
      </div>
      <Heading>Chart</Heading>
      <div style={gridStyle}>
        {themeTokens("color-chart-").map((token) => (
          <ColorCard key={token.name} {...token} />
        ))}
      </div>
    </div>
  ),
};

export const Palette: Story = {
  render: () => {
    const scales = new Map<string, typeof TOKENS.palette>();
    for (const token of TOKENS.palette) {
      const scale = token.name.split("-")[1];
      scales.set(scale, [...(scales.get(scale) ?? []), token]);
    }
    return (
      <div>
        {[...scales].map(([scale, tokens]) => (
          <div key={scale}>
            <Heading>{scale}</Heading>
            <div style={gridStyle}>
              {tokens.map((token) => (
                <ColorCard key={token.name} {...token} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
