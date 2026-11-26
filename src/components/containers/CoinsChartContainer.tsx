import { useMemo } from "react";
import {
  CHART_METRIC_FORMATTERS,
  CHART_METRIC_LABELS,
  CHART_METRIC_OPTIONS,
  CHART_TYPE_OPTIONS,
} from "../../constants/chartOptions";
import { coinsToChartData } from "../../mappers/coinsToChartData";
import { coinsToPieRings } from "../../mappers/coinsToPieRings";
import {
  selectChartMetric,
  selectChartType,
  selectSetChartMetric,
  selectSetChartType,
} from "../../store/selectors";
import { useAppStore } from "../../store/useAppStore";
import type { CoinMarket } from "../../types/coingecko";
import { ChartTypeToggle } from "../charts/ChartTypeToggle";
import { CoinsChart } from "../charts/CoinsChart";
import { EmptyState } from "../feedback/EmptyState";
import { SelectField } from "../form/SelectField";

export interface CoinsChartContainerProps {
  coins: readonly CoinMarket[];
}

export function CoinsChartContainer({ coins }: CoinsChartContainerProps) {
  const chartType = useAppStore(selectChartType);
  const chartMetric = useAppStore(selectChartMetric);
  const setChartType = useAppStore(selectSetChartType);
  const setChartMetric = useAppStore(selectSetChartMetric);

  const barData = useMemo(() => coinsToChartData(coins, chartMetric), [coins, chartMetric]);
  const pieRings = useMemo(() => coinsToPieRings(coins, chartMetric), [coins, chartMetric]);

  const valueLabel = CHART_METRIC_LABELS[chartMetric];
  const valueFormatter = CHART_METRIC_FORMATTERS[chartMetric];
  const colorBySign = chartMetric === "price_change_percentage_24h";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4">
        <ChartTypeToggle
          label="Chart type"
          value={chartType}
          options={CHART_TYPE_OPTIONS}
          onChange={setChartType}
        />
        <SelectField
          label="Metric"
          options={CHART_METRIC_OPTIONS}
          value={chartMetric}
          onChange={setChartMetric}
        />
      </div>
      {chartType === "bar" ? (
        barData.length === 0 ? (
          <EmptyState message="No data for this metric." />
        ) : (
          <>
            <CoinsChart
              type="bar"
              data={barData}
              valueLabel={valueLabel}
              valueFormatter={valueFormatter}
              colorBySign={colorBySign}
            />
            {coins.length > barData.length && (
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Showing the first {barData.length} of {coins.length} coins.
              </p>
            )}
          </>
        )
      ) : pieRings === null ? (
        <EmptyState message="No data for this metric." />
      ) : (
        <CoinsChart
          type="pie"
          rings={pieRings}
          valueLabel={valueLabel}
          valueFormatter={valueFormatter}
          colorBySign={colorBySign}
        />
      )}
    </div>
  );
}
