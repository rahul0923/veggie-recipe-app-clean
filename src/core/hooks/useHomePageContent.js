// src/core/hooks/useHomePageContent.js
import { useCallback } from 'react';

export function useHomePageContent({
  timeOfDay,
  searchTerm,
  selectedDiet,
  selectedIngredients,
  filteredRecipes,
  handleResetAllFilters
}) {
  // Generate page heading
  const getPageHeading = useCallback(() => {
    let heading = '';
    
    // Base title by meal time
    if (timeOfDay === 'snack') {
      heading = 'Evening Snacks';
    } else if (timeOfDay) {
      heading = `${timeOfDay} Recipes`;
    } else {
      heading = 'All Recipes';
    }
    
    // Add diet filter info
    if (selectedDiet !== 'all') {
      heading += ` (${selectedDiet} only)`;
    }
    
    // Add search term info
    if (searchTerm) {
      heading += ` matching "${searchTerm}"`;
    }
    
    // Add ingredients info
    if (selectedIngredients.length > 0) {
      heading += ` with ${selectedIngredients.join(', ')}`;
    }
    
    return heading;
  }, [timeOfDay, searchTerm, selectedDiet, selectedIngredients]);
  
  // Determine if we should show the reset filters button
  const showResetFilters = useCallback(() => {
    return searchTerm || selectedIngredients.length > 0 || selectedDiet !== 'all';
  }, [searchTerm, selectedIngredients, selectedDiet]);
  
  // Generate empty state message
  const getEmptyStateMessage = useCallback(() => {
    if (searchTerm || selectedIngredients.length > 0 || selectedDiet !== 'all') {
      return 'No recipes found with the current filters. Try adjusting your search or filters.';
    } else if (timeOfDay) {
      return `No recipes found for ${timeOfDay}.`;
    } else {
      return 'No recipes available.';
    }
  }, [searchTerm, selectedIngredients, selectedDiet, timeOfDay]);
  
  return {
    getPageHeading,
    showResetFilters,
    getEmptyStateMessage,
    hasRecipes: filteredRecipes.length > 0,
    handleResetAllFilters
  };
}