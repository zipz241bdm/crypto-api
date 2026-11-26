import { formatChange, formatUsd, getChangeColor } from "../../utils/format";

export interface CoinListItemProps {
  name: string;
  symbol: string;
  currentPrice: number | null;
  change24h: number | null;
}

export function CoinListItem({ name, symbol, currentPrice, change24h }: CoinListItemProps) {
  return (
    <div className="flex items-center justify-between rounded border p-3">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{symbol.toUpperCase()}</div>
      </div>
      <div className="text-right">
        <div className="font-medium">{formatUsd(currentPrice)}</div>
        <div className={`text-sm ${getChangeColor(change24h)}`}>{formatChange(change24h)}</div>
      </div>
    </div>
  );
}
