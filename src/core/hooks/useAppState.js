// src/core/hooks/useAppState.js
import { useState, useCallback, useEffect } from 'react';
import { useRecipes } from './useRecipes';
import { useMealTime } from './useMealTime';

export function useAppState() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Use our core hooks
  const { timeOfDay, setTimeOfDay } = useMealTime();
  
  // Pass the current timeOfDay to useRecipes
  const { 
    filteredRecipes, 
    searchTerm, 
    selectedDiet, 
    selectedIngredients,
    availableIngredients,
    handleSearch,
    handleDietChange,
    handleIngredientsChange,
    resetFilters,
    refreshRecipes,
    isLoading,
    error
  } = useRecipes(timeOfDay);

  // Toggle filter panel
  const toggleFilter = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);
  
  // Function to refresh recipe list after favorites change
  const handleFavoriteToggle = useCallback(async () => {
    await refreshRecipes();
  }, [refreshRecipes]);
  
  // Reset all filters
  const handleResetAllFilters = useCallback(() => {
    handleSearch('');
    handleIngredientsChange([]);
    handleDietChange('all');
  }, [handleSearch, handleIngredientsChange, handleDietChange]);

  return {
    // State
    isFilterOpen,
    timeOfDay,
    searchTerm,
    selectedDiet,
    selectedIngredients,
    availableIngredients,
    filteredRecipes,
    isLoading,
    error,
    
    // Actions
    setTimeOfDay,
    toggleFilter,
    handleSearch,
    handleDietChange,
    handleIngredientsChange,
    handleFavoriteToggle,
    handleResetAllFilters,
    refreshRecipes
  };
}