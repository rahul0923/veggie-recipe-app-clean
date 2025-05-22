// src/hooks/useWebRecipes.js - Web-specific wrapper
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecipes } from './useRecipes';
import { urlService } from '../services/urlService';

export function useWebRecipes(timeOfDay = '') {
  const location = useLocation();
  const navigate = useNavigate();
  const recipeUtils = useRecipes(timeOfDay);
  
  // Wrap handleSearch with URL handling
  const handleSearchWithURL = useCallback((term) => {
    recipeUtils.handleSearch(term);
    
    // Skip URL updates for search to avoid issues
    // If you want URL updates, uncomment below:
    /*
    const params = urlService.getParams(location.search);
    params.search = term || undefined;
    urlService.updateParams(params, navigate);
    */
  }, [recipeUtils, navigate, location.search]);
  
  // Wrap handleDietChange with URL handling
  const handleDietChangeWithURL = useCallback((diet) => {
    recipeUtils.handleDietChange(diet);
    
    const params = urlService.getParams(location.search);
    params.diet = (diet && diet !== 'all') ? diet : undefined;
    urlService.updateParams(params, navigate);
  }, [recipeUtils, navigate, location.search]);
  
  // Wrap handleIngredientsChange with URL handling
  const handleIngredientsChangeWithURL = useCallback((ingredients) => {
    recipeUtils.handleIngredientsChange(ingredients);
    
    const params = urlService.getParams(location.search);
    params.ingredients = (ingredients && ingredients.length > 0) 
      ? ingredients.join(',') 
      : undefined;
    urlService.updateParams(params, navigate);
  }, [recipeUtils, navigate, location.search]);

  return {
    ...recipeUtils,
    handleSearchWithURL,
    handleDietChangeWithURL,
    handleIngredientsChangeWithURL
  };
}