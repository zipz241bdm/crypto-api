import { useState } from "react";
import { Button, Card, Stack, Text } from "../../design-system";

export interface CounterProps {
  label?: string;
  initialValue?: number;
  step?: number;
}

export function Counter({ label = "Counter", initialValue = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <Card padding="md">
      <Stack gap="sm">
        <Text size="sm" tone="muted">
          {label}
        </Text>
        <Text size="2xl" weight="semibold" numeric>
          {count}
        </Text>
        <Stack direction="row" gap="xs">
          <Button variant="secondary" size="sm" onClick={decrement}>
            -
          </Button>
          <Button variant="secondary" size="sm" onClick={increment}>
            +
          </Button>
          <Button variant="secondary" size="sm" onClick={reset}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
