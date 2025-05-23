// src/platforms/web/pages/FavoritesPage.jsx
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { useFavoritesPage } from '../../../core/hooks/useFavoritesPage';

const FavoritesPage = ({ onFavoriteToggle }) => {
  const navigate = useNavigate();
  const { favoriteRecipes, isLoading, clearFavorites } = useFavoritesPage();
  
  if (isLoading) {
    return <div className="loading">Loading your favorites...</div>;
  }
  
  return (
    <div className="favorites-page">
      <h1 className="page-heading">My Favorite Recipes</h1>
      
      {favoriteRecipes.length > 0 ? (
        <div className="recipe-grid">
          {favoriteRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-message">You haven't saved any favorites yet.</p>
          <button
            className="reset-filters-button"
            onClick={() => navigate('/')}
          >
            Browse Recipes
          </button>
        </div>
      )}
      
      {favoriteRecipes.length > 0 && (
        <button 
          className="reset-button"
          onClick={() => {
            if (window.confirm('Are you sure you want to reset your favorites?')) {
              clearFavorites();
              // Notify parent if needed
              if (onFavoriteToggle) {
                onFavoriteToggle();
              }
            }
          }}
        >
          Reset All Favorites
        </button>
      )}
    </div>
  );
};

export default FavoritesPage;