import { formatChange, getChangeColor } from "../../utils/format";

export interface KpiCardProps {
  title: string;
  value: string;
  change?: number | null;
}

export function KpiCard({ title, value, change }: KpiCardProps) {
  return (
    <div className="rounded border p-4 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {change != null && (
        <div className={`text-sm font-medium ${getChangeColor(change)}`}>
          {formatChange(change)}
        </div>
      )}
    </div>
  );
}
