// src/hooks/useRecipeDetail.js
import { useState, useEffect, useCallback } from 'react';
import { recipeService } from '../services/recipeService';

export function useRecipeDetail(recipeId) {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Wrap fetchRecipe in useCallback to stabilize the function reference
  const fetchRecipe = useCallback(async () => {
    if (!recipeId) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await recipeService.getRecipeById(parseInt(recipeId));
      if (data) {
        setRecipe(data);
      } else {
        setError('Recipe not found');
      }
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setError('Failed to load recipe');
    } finally {
      setIsLoading(false);
    }
  }, [recipeId]); // Include recipeId in dependencies

  // Now include fetchRecipe in the dependencies
  useEffect(() => {
    fetchRecipe();
    
    // Scroll to top when recipe changes
    window.scrollTo(0, 0);
  }, [fetchRecipe]); // fetchRecipe is now a dependency
  
  // Function to handle favorite toggle
  const handleFavoriteToggle = async () => {
    // Re-fetch the recipe after toggling favorite
    await fetchRecipe();
  };

  // Rest of your code...
  
  return {
    recipe,
    isLoading,
    error,
    handleFavoriteToggle
  };
}