import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDatum } from "../../types/dashboard";
import {
  CHART_AXIS,
  CHART_GRID,
  CHART_TEXT,
  CHART_TOOLTIP_STYLE,
  NEGATIVE_COLOR,
  NEUTRAL_COLOR,
  POSITIVE_COLOR,
} from "./chartColors";

export interface BarCoinsChartProps {
  data: ChartDatum[];
  valueLabel: string;
  valueFormatter: (value: number) => string;
  colorBySign: boolean;
  height: number;
}

const AXIS_TICK = { fill: CHART_AXIS, fontSize: 12 };

export function BarCoinsChart({
  data,
  valueLabel,
  valueFormatter,
  colorBySign,
  height,
}: BarCoinsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
        <XAxis dataKey="label" tick={AXIS_TICK} stroke={CHART_AXIS} />
        <YAxis
          width="auto"
          tick={AXIS_TICK}
          stroke={CHART_AXIS}
          tickFormatter={(value: number) => valueFormatter(value)}
        />
        <ReferenceLine y={0} stroke="var(--color-border-strong)" />
        <Tooltip
          formatter={(value) => [valueFormatter(Number(value)), valueLabel]}
          labelFormatter={(label, payload) => payload?.[0]?.payload?.name ?? label}
          contentStyle={CHART_TOOLTIP_STYLE}
          itemStyle={{ color: CHART_TEXT }}
        />
        <Bar
          dataKey="value"
          isAnimationActive={false}
          fill={NEUTRAL_COLOR}
          shape={(props) => {
            const fill = colorBySign
              ? props.payload.value >= 0
                ? POSITIVE_COLOR
                : NEGATIVE_COLOR
              : NEUTRAL_COLOR;
            return <Rectangle {...props} fill={fill} />;
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
