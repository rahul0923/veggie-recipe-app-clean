// src/platforms/web/components/RecipeDetail.jsx
// Platform-specific container with routing logic
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeDetail } from '../../../core/hooks/useRecipeDetail';
import { useFavorites } from '../../../core/contexts/FavoritesContext';
import RecipeDetailView from '../../../core/components/RecipeDetailView';

const RecipeDetail = ({ onFavoriteToggle }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipe, isLoading, error } = useRecipeDetail(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Platform-specific navigation handlers
  const handleBack = () => {
    navigate(-1); // or navigate('/') for always going home
  };
  
  const handleToggleFavorite = async (recipeId) => {
    toggleFavorite(recipeId);
    
    // Notify parent if needed
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };
  
  const handleVideoClick = (videoUrl) => {
    // Platform-specific: open in new tab on web
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container">
        <div className="recipe-detail-loading">
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error || !recipe) {
    return (
      <div className="container">
        <div className="recipe-detail-error">
          <p>{error || 'Recipe not found'}</p>
          <button onClick={handleBack} className="back-button">
            ← Back to recipes
          </button>
        </div>
      </div>
    );
  }

  // Render the presentational component with platform-specific handlers
  return (
    <RecipeDetailView
      recipe={recipe}
      isFavorite={isFavorite(recipe.id)}
      onBack={handleBack}
      onToggleFavorite={handleToggleFavorite}
      onVideoClick={handleVideoClick}
    />
  );
};

export default RecipeDetail;