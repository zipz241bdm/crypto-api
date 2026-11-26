import { IconButton } from "../../design-system";
import { selectAddFavorite, selectIsFavorite, selectRemoveFavorite } from "../../store/selectors";
import { useAppStore } from "../../store/useAppStore";

export interface FavoriteButtonProps {
  coinId: string;
  coinName: string;
}

export function FavoriteButton({ coinId, coinName }: FavoriteButtonProps) {
  const isFavorite = useAppStore(selectIsFavorite(coinId));
  const addFavorite = useAppStore(selectAddFavorite);
  const removeFavorite = useAppStore(selectRemoveFavorite);

  return (
    <IconButton
      label={`Favorite ${coinName}`}
      pressed={isFavorite}
      tone="favorite"
      onClick={() => (isFavorite ? removeFavorite(coinId) : addFavorite(coinId))}
    >
      {isFavorite ? "★" : "☆"}
    </IconButton>
  );
}
