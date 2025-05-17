// src/components/recipe/RecipeCard.jsx - Container component
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import RecipeCardView from './RecipeCardView';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFavorited = isFavorite(recipe.id);
  
  const handleFavoriteToggle = (recipeId) => {
    toggleFavorite(recipeId);
  };
  
  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  
  return (
    <RecipeCardView
      recipe={recipe}
      isFavorite={isFavorited}
      onFavoriteToggle={handleFavoriteToggle}
      onCardClick={handleCardClick}
    />
  );
};

export default RecipeCard;