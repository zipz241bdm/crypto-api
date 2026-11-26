import type { ReactNode } from "react";
import { Card } from "../../atoms/Card/Card";
import { Text } from "../../atoms/Text/Text";

export interface StatListItem {
  /** Descriptive term label. */
  label: string;
  /** Formatted value or inline element. */
  value: ReactNode;
}

export interface StatListProps {
  /** Key-value rows to display. */
  items: StatListItem[];
}

export function StatList({ items }: StatListProps) {
  return (
    <Card padding="none">
      <dl className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.label} className="flex items-baseline justify-between gap-md px-sm py-xs">
            <dt>
              <Text as="span" size="sm" tone="muted">
                {item.label}
              </Text>
            </dt>
            <dd className="text-right">
              <Text as="span" size="sm" weight="medium" numeric>
                {item.value}
              </Text>
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
