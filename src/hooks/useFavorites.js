// src/hooks/useFavorites.js
import { useState, useEffect } from 'react';

/**
 * Hook for managing favorite recipes
 * @returns {Object} Favorites state and functions
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load favorites from storage when hook is initialized
  useEffect(() => {
    const loadFavorites = () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        } else {
          // Initialize with empty array if no favorites exist
          setFavorites([]);
          localStorage.setItem('favorites', JSON.stringify([]));
        }
      } catch (err) {
        console.error('Error loading favorites:', err);
        setError('Failed to load favorites');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFavorites();
  }, []);
  
  /**
   * Check if a recipe is in favorites
   * @param {number|string} recipeId - The recipe ID to check
   * @returns {boolean} True if recipe is in favorites
   */
  const isFavorite = (recipeId) => {
    return favorites.includes(Number(recipeId));
  };
  
  /**
   * Add a recipe to favorites
   * @param {number|string} recipeId - The recipe ID to add
   */
  const addFavorite = (recipeId) => {
    const numericId = Number(recipeId);
    
    if (favorites.includes(numericId)) {
      return; // Already in favorites
    }
    
    const newFavorites = [...favorites, numericId];
    setFavorites(newFavorites);
    
    // Persist to storage
    try {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (err) {
      console.error('Error saving favorites:', err);
      setError('Failed to save favorite');
    }
  };
  
  /**
   * Remove a recipe from favorites
   * @param {number|string} recipeId - The recipe ID to remove
   */
  const removeFavorite = (recipeId) => {
    const numericId = Number(recipeId);
    
    if (!favorites.includes(numericId)) {
      return; // Not in favorites
    }
    
    const newFavorites = favorites.filter(id => id !== numericId);
    setFavorites(newFavorites);
    
    // Persist to storage
    try {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (err) {
      console.error('Error saving favorites:', err);
      setError('Failed to remove favorite');
    }
  };
  
  /**
   * Toggle favorite status for a recipe
   * @param {number|string} recipeId - The recipe ID to toggle
   * @returns {boolean} New favorite status
   */
  const toggleFavorite = (recipeId) => {
    const numericId = Number(recipeId);
    const currentStatus = isFavorite(numericId);
    
    if (currentStatus) {
      removeFavorite(numericId);
    } else {
      addFavorite(numericId);
    }
    
    return !currentStatus;
  };
  
  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
    
    try {
      localStorage.setItem('favorites', JSON.stringify([]));
    } catch (err) {
      console.error('Error clearing favorites:', err);
      setError('Failed to clear favorites');
    }
  };
  
  return {
    favorites,
    isLoading,
    error,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites
  };
}