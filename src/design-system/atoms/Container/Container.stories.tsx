import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../Card/Card";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { Container } from "./Container";

const meta = {
  title: "Atoms/Container",
  component: Container,
  args: {
    maxWidth: "page",
    padding: "md",
    as: "div",
    children: (
      <Card>
        <Text>Centered container content</Text>
      </Card>
    ),
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MaxWidths: Story = {
  render: () => (
    <Stack gap="md">
      <Container maxWidth="narrow" padding="none">
        <Card>
          <Text size="sm">narrow (40rem)</Text>
        </Card>
      </Container>
      <Container maxWidth="page" padding="none">
        <Card>
          <Text size="sm">page (80rem)</Text>
        </Card>
      </Container>
      <Container maxWidth="full" padding="none">
        <Card>
          <Text size="sm">full (none)</Text>
        </Card>
      </Container>
    </Stack>
  ),
};

export const Paddings: Story = {
  render: () => (
    <Stack gap="md">
      <Container padding="none">
        <Card>
          <Text size="sm">padding: none</Text>
        </Card>
      </Container>
      <Container padding="sm">
        <Card>
          <Text size="sm">padding: sm</Text>
        </Card>
      </Container>
      <Container padding="md">
        <Card>
          <Text size="sm">padding: md</Text>
        </Card>
      </Container>
      <Container padding="lg">
        <Card>
          <Text size="sm">padding: lg</Text>
        </Card>
      </Container>
    </Stack>
  ),
};
