import { useMemo } from "react";
import {
  CHART_METRIC_FORMATTERS,
  CHART_METRIC_LABELS,
  CHART_METRIC_OPTIONS,
  CHART_TYPE_OPTIONS,
} from "../../constants/chartOptions";
import { EmptyState, FormField, SegmentedControl, Select, Stack, Text } from "../../design-system";
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
import { CoinsChart } from "../charts/CoinsChart";

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
    <Stack gap="md">
      <Stack direction="row" align="end" gap="md" wrap>
        <SegmentedControl
          label="Chart type"
          value={chartType}
          options={CHART_TYPE_OPTIONS}
          onValueChange={setChartType}
        />
        <FormField label="Metric">
          {(controlProps) => (
            <Select
              {...controlProps}
              options={CHART_METRIC_OPTIONS}
              value={chartMetric}
              onValueChange={setChartMetric}
            />
          )}
        </FormField>
      </Stack>
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
              <Text size="xs" tone="muted">
                Showing the first {barData.length} of {coins.length} coins.
              </Text>
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
    </Stack>
  );
}
