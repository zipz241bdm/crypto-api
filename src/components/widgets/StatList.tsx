import type { ReactNode } from "react";

export interface StatItem {
  label: string;
  value: ReactNode;
}

export interface StatListProps {
  items: StatItem[];
}

export function StatList({ items }: StatListProps) {
  return (
    <dl className="divide-y rounded border">
      {items.map((item) => (
        <div key={item.label} className="flex justify-between gap-4 px-3 py-2">
          <dt className="text-gray-600 dark:text-gray-400">{item.label}</dt>
          <dd className="text-right font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
