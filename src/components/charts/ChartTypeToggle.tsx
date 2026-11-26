import { useId } from "react";
import type { ChartType, SelectOption } from "../../types/dashboard";

export interface ChartTypeToggleProps {
  label: string;
  value: ChartType;
  options: SelectOption<ChartType>[];
  onChange: (type: ChartType) => void;
}

export function ChartTypeToggle({ label, value, options, onChange }: ChartTypeToggleProps) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-1">
      <span id={labelId} className="text-sm font-medium">
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={labelId}
        className="inline-flex overflow-hidden rounded border"
      >
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.value)}
              className={`cursor-pointer px-4 py-2 focus-visible:outline-2 ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
