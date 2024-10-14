type FavoriteButtonProps = {
    isFavorite: boolean;
    onClick: () => void;
  };
  
  export const FavoriteButton = ({ isFavorite, onClick }: FavoriteButtonProps) => {
    return (
      <button onClick={onClick}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    );
  };