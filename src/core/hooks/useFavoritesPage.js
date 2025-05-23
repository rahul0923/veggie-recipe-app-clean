// src/core/hooks/useFavoritesPage.js
import { useState, useEffect, useCallback } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

export function useFavoritesPage() {
  const { getFavoriteRecipes, clearFavorites } = useFavorites();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load favorites on initialization
  const loadFavorites = useCallback(async () => {
    setIsLoading(true);
    const recipes = await getFavoriteRecipes();
    setFavoriteRecipes(recipes);
    setIsLoading(false);
  }, [getFavoriteRecipes]);
  
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites, clearFavorites]);
  
  // Reset favorites with confirmation
  const handleClearFavorites = useCallback(() => {
    clearFavorites();
    setFavoriteRecipes([]);
  }, [clearFavorites]);
  
  // Refresh favorites list
  const refreshFavorites = useCallback(() => {
    loadFavorites();
  }, [loadFavorites]);
  
  return {
    favoriteRecipes,
    isLoading,
    clearFavorites: handleClearFavorites,
    refreshFavorites
  };
}