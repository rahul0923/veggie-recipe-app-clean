// src/platforms/web/hooks/useWebNavigation.js
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useWebNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Update URL with meal time parameter
  const updateTimeOfDayURL = useCallback((timeOfDay) => {
    const params = new URLSearchParams(location.search);
    
    if (timeOfDay) {
      params.set('meal', timeOfDay);
    } else {
      params.delete('meal');
    }
    
    navigate(`/?${params.toString()}`);
  }, [navigate, location.search]);
  
  // Update URL with diet parameter
  const updateDietURL = useCallback((diet) => {
    const params = new URLSearchParams(location.search);
    
    if (diet && diet !== 'all') {
      params.set('diet', diet);
    } else {
      params.delete('diet');
    }
    
    navigate(`/?${params.toString()}`);
  }, [navigate, location.search]);
  
  // Update URL with search parameter
  const updateSearchURL = useCallback((term) => {
    const params = new URLSearchParams(location.search);
    
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    
    navigate(`/?${params.toString()}`);
  }, [navigate, location.search]);
  
  // Update URL with ingredients parameter
  const updateIngredientsURL = useCallback((ingredients) => {
    const params = new URLSearchParams(location.search);
    
    if (ingredients && ingredients.length > 0) {
      params.set('ingredients', ingredients.join(','));
    } else {
      params.delete('ingredients');
    }
    
    navigate(`/?${params.toString()}`);
  }, [navigate, location.search]);
  
  // Reset all URL parameters
  const resetAllURLParams = useCallback(() => {
    navigate('/');
  }, [navigate]);
  
  // Extract parameters from URL
  const getURLParams = useCallback(() => {
    const params = new URLSearchParams(location.search);
    
    return {
      meal: params.get('meal') || '',
      diet: params.get('diet') || 'all',
      search: params.get('search') || '',
      ingredients: params.get('ingredients') ? params.get('ingredients').split(',') : []
    };
  }, [location.search]);
  
  return {
    updateTimeOfDayURL,
    updateDietURL,
    updateSearchURL,
    updateIngredientsURL,
    resetAllURLParams,
    getURLParams,
    
    // Also expose the raw hooks for more complex use cases
    navigate,
    location
  };
}