import type { ChartDatum, PieRings } from "../../types/dashboard";
import { BarCoinsChart } from "./BarCoinsChart";
import { describeRings } from "../../utils/describeRings";
import { PieCoinsChart } from "./PieCoinsChart";

interface CommonProps {
  valueLabel: string;
  valueFormatter: (value: number) => string;
  colorBySign?: boolean;
  height?: number;
}

export type CoinsChartProps = CommonProps &
  ({ type: "bar"; data: ChartDatum[] } | { type: "pie"; rings: PieRings });

export function CoinsChart(props: CoinsChartProps) {
  const { valueLabel, valueFormatter, colorBySign = false, height = 320 } = props;

  const summary =
    props.type === "bar"
      ? `Bar chart of ${valueLabel} for ${props.data.length} coins`
      : `Pie chart of ${valueLabel}. ${describeRings(props.rings, valueFormatter)
          .map((caption) => caption.text)
          .join(". ")}`;

  return (
    <figure className="m-0">
      <figcaption className="sr-only">{summary}</figcaption>
      {props.type === "bar" ? (
        <BarCoinsChart
          data={props.data}
          valueLabel={valueLabel}
          valueFormatter={valueFormatter}
          colorBySign={colorBySign}
          height={height}
        />
      ) : (
        <PieCoinsChart
          rings={props.rings}
          valueLabel={valueLabel}
          valueFormatter={valueFormatter}
          colorBySign={colorBySign}
          height={height}
        />
      )}
    </figure>
  );
}
