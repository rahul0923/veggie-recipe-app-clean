// src/shared/components/FavoriteButton.jsx
import { memo, useCallback } from 'react';

import { useFavorites } from '../../core/contexts/FavoritesContext';

const FavoriteButton = ({ recipeId }) => {

  const { isFavorite, toggleFavorite } = useFavorites();
  const isFavorited = isFavorite(recipeId);
  
  const handleToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  }, [recipeId, toggleFavorite]);
  
  return (
    <button 
      onClick={handleToggle}
      className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorited ? '★' : '☆'}
    </button>
  );
};

export default memo(FavoriteButton);