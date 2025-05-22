// src/components/pages/FavoritesPage.jsx
import { useState, useEffect } from 'react';

import { useFavorites  } from '../../../core/contexts/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

const FavoritesPage = () => {
  const { getFavoriteRecipes, clearFavorites } = useFavorites();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      const recipes = await getFavoriteRecipes();
      setFavoriteRecipes(recipes);
      setIsLoading(false);
    };
    
    loadFavorites();
  }, [getFavoriteRecipes, clearFavorites]);
  
  if (isLoading) {
    return <div className="loading">Loading your favorites...</div>;
  }
  
  return (
    <div className="favorites-page">
      <h1 className="page-heading">My Favorite Recipes</h1>
      
      {favoriteRecipes.length > 0 ? (
        <div className="recipe-grid">
          {favoriteRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-message">You haven't saved any favorites yet.</p>
        </div>
      )}
        {favoriteRecipes.length > 0 && (
          <button 
            className="reset-button"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your favorites?')) {
                clearFavorites();
                // Also update local state if needed
                setFavoriteRecipes([]);
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