import { Pie, PieChart, ResponsiveContainer, Tooltip, type PieLabelRenderProps } from "recharts";
import { Stack, Swatch, Text } from "../../design-system";
import type { PieRing, PieRings } from "../../types/dashboard";
import { describeRings } from "../../utils/describeRings";
import {
  CHART_LABEL,
  CHART_LABEL_OUTLINE,
  CHART_SURFACE,
  CHART_TEXT,
  CHART_TOOLTIP_STYLE,
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
      fill={CHART_LABEL}
      stroke={CHART_LABEL_OUTLINE}
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
    stroke: CHART_SURFACE,
    isAnimationActive: false,
    label: renderSliceLabel,
    labelLine: false,
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
  } as const;

  return (
    <Stack gap="xs">
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
            contentStyle={CHART_TOOLTIP_STYLE}
            itemStyle={{ color: CHART_TEXT }}
          />
        </PieChart>
      </ResponsiveContainer>
      <Stack as="ul" direction="row" wrap justify="center" gap="lg">
        {captions.map((caption) => (
          <li key={caption.text}>
            <Stack direction="row" align="center" gap="xs">
              <Swatch color={ringColor(caption.sign, colorBySign)} size="sm" />
              <Text as="span" size="sm">
                {caption.text}
              </Text>
            </Stack>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
