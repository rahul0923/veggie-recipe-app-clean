// src/context/FavoritesContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { recipeService } from '../services/recipeService';

// Create the context
const FavoritesContext = createContext();

// Provider component
export function FavoritesProvider({ children }) {
  // Store just the IDs of favorited recipes
  const [favoriteIds, setFavoriteIds] = useState([]);
  
  // Load initial favorites
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Get IDs of favorited recipes from localStorage
        const storedFavorites = localStorage.getItem('favoriteRecipes');
        if (storedFavorites) {
          setFavoriteIds(JSON.parse(storedFavorites));
        }
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    };
    
    loadFavorites();
  }, []);
  
  // Check if a recipe is favorited
  const isFavorite = useCallback((recipeId) => {
    return favoriteIds.includes(Number(recipeId));
  }, [favoriteIds]);
  
  // Toggle favorite status
  const toggleFavorite = useCallback((recipeId) => {
    const numericId = Number(recipeId);
    let newIds;
    
    if (favoriteIds.includes(numericId)) {
      // Remove from favorites
      newIds = favoriteIds.filter(id => id !== numericId);
    } else {
      // Add to favorites
      newIds = [...favoriteIds, numericId];
    }
    
    // Update state
    setFavoriteIds(newIds);
    
    // Persist to localStorage
    try {
      localStorage.setItem('favoriteRecipes', JSON.stringify(newIds));
    } catch (err) {
      console.error('Error saving favorites:', err);
    }
    
    return !favoriteIds.includes(numericId);
  }, [favoriteIds]);
  
  // Get all favorite recipes
  const getFavoriteRecipes = useCallback(async () => {
    try {
      const allRecipes = await recipeService.getAllRecipes();
      return allRecipes.filter(recipe => favoriteIds.includes(recipe.id));
    } catch (err) {
      console.error('Error getting favorite recipes:', err);
      return [];
    }
  }, [favoriteIds]);
  
  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
    localStorage.removeItem('favoriteRecipes');
  }, []);
  
  // Context value
  const value = {
    favoriteIds,
    isFavorite,
    toggleFavorite,
    getFavoriteRecipes,
    clearFavorites
  };
  
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to use the context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}