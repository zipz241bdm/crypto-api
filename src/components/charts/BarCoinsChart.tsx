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
import { NEGATIVE_COLOR, NEUTRAL_COLOR, POSITIVE_COLOR } from "./chartColors";

export interface BarCoinsChartProps {
  data: ChartDatum[];
  valueLabel: string;
  valueFormatter: (value: number) => string;
  colorBySign: boolean;
  height: number;
}

const AXIS_TICK = { fill: "currentColor", fontSize: 12 };

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
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.2} />
        <XAxis dataKey="label" tick={AXIS_TICK} stroke="currentColor" />
        <YAxis
          width="auto"
          tick={AXIS_TICK}
          stroke="currentColor"
          tickFormatter={(value: number) => valueFormatter(value)}
        />
        <ReferenceLine y={0} stroke="currentColor" strokeOpacity={0.5} />
        <Tooltip
          formatter={(value) => [valueFormatter(Number(value)), valueLabel]}
          labelFormatter={(label, payload) => payload?.[0]?.payload?.name ?? label}
          contentStyle={{ backgroundColor: "Canvas", color: "CanvasText" }}
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
