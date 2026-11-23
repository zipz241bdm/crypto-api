import { Pie, PieChart, ResponsiveContainer, Tooltip, type PieLabelRenderProps } from "recharts";
import type { PieRing, PieRings } from "../../types/dashboard";
import { describeRings } from "../../utils/describeRings";
import {
  NEGATIVE_COLOR,
  NEGATIVE_SHADES,
  NEUTRAL_COLOR,
  NEUTRAL_SHADES,
  OTHER_COLOR,
  POSITIVE_COLOR,
  POSITIVE_SHADES,
} from "./chartColors";

export interface PieCoinsChartProps {
  rings: PieRings;
  valueLabel: string;
  valueFormatter: (value: number) => string;
  colorBySign: boolean;
  height: number;
}

const RADIAN = Math.PI / 180;
const MIN_LABEL_SHARE = 0.06;
const START_ANGLE = 90;
const END_ANGLE = -270;

function shadesFor(sign: PieRing["sign"], colorBySign: boolean): string[] {
  if (!colorBySign) return NEUTRAL_SHADES;
  return sign === "positive" ? POSITIVE_SHADES : NEGATIVE_SHADES;
}

function ringColor(sign: PieRing["sign"], colorBySign: boolean): string {
  if (!colorBySign) return NEUTRAL_COLOR;
  return sign === "positive" ? POSITIVE_COLOR : NEGATIVE_COLOR;
}

function withColors(ring: PieRing, colorBySign: boolean) {
  const shades = shadesFor(ring.sign, colorBySign);
  return ring.slices.map((slice, index) => ({
    ...slice,
    fill: slice.id === "other" ? OTHER_COLOR : shades[index % shades.length],
  }));
}

function renderSliceLabel(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, payload } = props;
  if ((percent ?? 0) < MIN_LABEL_SHARE) return null;

  const symbol = (payload as { label?: string } | undefined)?.label ?? "";

  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
  const angle = -(midAngle ?? 0) * RADIAN;
  return (
    <text
      x={Number(cx) + radius * Math.cos(angle)}
      y={Number(cy) + radius * Math.sin(angle)}
      fill="#ffffff"
      stroke="rgba(0, 0, 0, 0.5)"
      strokeWidth={2}
      paintOrder="stroke"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {symbol}
    </text>
  );
}

export function PieCoinsChart({
  rings,
  valueLabel,
  valueFormatter,
  colorBySign,
  height,
}: PieCoinsChartProps) {
  const { inner, outer } = rings;
  const captions = describeRings(rings, valueFormatter);

  const sharedPieProps = {
    dataKey: "magnitude",
    nameKey: "label",
    stroke: "Canvas",
    isAnimationActive: false,
    label: renderSliceLabel,
    labelLine: false,
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
  } as const;

  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            {...sharedPieProps}
            data={withColors(inner, colorBySign)}
            innerRadius={0}
            outerRadius={outer === null ? "80%" : "55%"}
          />
          {outer !== null && (
            <Pie
              {...sharedPieProps}
              data={withColors(outer, colorBySign)}
              innerRadius="62%"
              outerRadius="85%"
            />
          )}
          <Tooltip
            formatter={(_value, _name, item) => [
              valueFormatter(item.payload.value),
              `${item.payload.name} (${valueLabel})`,
            ]}
            contentStyle={{ backgroundColor: "Canvas", color: "CanvasText" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
        {captions.map((caption) => (
          <li key={caption.text} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: ringColor(caption.sign, colorBySign) }}
            />
            {caption.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
