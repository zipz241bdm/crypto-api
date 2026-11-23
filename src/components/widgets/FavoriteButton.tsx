import { selectAddFavorite, selectIsFavorite, selectRemoveFavorite } from "../../store/selectors";
import { useAppStore } from "../../store/useAppStore";
import { StarToggle } from "./StarToggle";

export interface FavoriteButtonProps {
  coinId: string;
  coinName: string;
}

export function FavoriteButton({ coinId, coinName }: FavoriteButtonProps) {
  const isFavorite = useAppStore(selectIsFavorite(coinId));
  const addFavorite = useAppStore(selectAddFavorite);
  const removeFavorite = useAppStore(selectRemoveFavorite);

  return (
    <StarToggle
      isActive={isFavorite}
      subject={coinName}
      onToggle={() => (isFavorite ? removeFavorite(coinId) : addFavorite(coinId))}
    />
  );
}
