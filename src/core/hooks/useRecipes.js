// src/core/hooks/useRecipes.js - Platform-agnostic version
import { useState, useEffect, useCallback } from 'react';
import { recipeService } from '../services/recipeService';
import { filterService } from '../services/filterService';
import { ingredientService } from '../services/ingredientService';

export function useRecipes(currentTimeOfDay = '') {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter state - DON'T manage timeOfDay here, use the passed parameter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  
  // Load all recipes initially
  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await recipeService.getAllRecipes();
        setRecipes(data);
        
        // Get all unique ingredients
        const ingredients = ingredientService.getAllIngredients(data);
        setAvailableIngredients(ingredients);
      } catch (err) {
        setError('Failed to load recipes');
        console.error('Error loading recipes:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRecipes();
  }, []);

  // Apply filters whenever criteria change - use currentTimeOfDay parameter
  useEffect(() => {
    if (recipes.length === 0) return;
    
    const filters = {
      timeOfDay: currentTimeOfDay, // Use the parameter, not local state
      searchTerm,
      selectedDiet,
      selectedIngredients
    };
    
    const results = filterService.filterRecipes(recipes, filters);
    setFilteredRecipes(results);
  }, [recipes, currentTimeOfDay, searchTerm, selectedIngredients, selectedDiet]);

  // Functions to handle state changes - NO URL updates here
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);
  
  const handleDietChange = useCallback((diet) => {
    setSelectedDiet(diet);
  }, []);
  
  const handleIngredientsChange = useCallback((ingredients) => {
    setSelectedIngredients(ingredients);
  }, []);

  const refreshRecipes = useCallback(async () => {
    try {
      const freshRecipes = await recipeService.getAllRecipes();
      setRecipes(freshRecipes);
    } catch (error) {
      setError('Failed to refresh recipes');
      console.error("Error refreshing recipes:", error);
    }
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedDiet('all');
    setSelectedIngredients([]);
    // Note: We don't reset timeOfDay here since it's managed externally
  }, []);

  return {
    // Data
    recipes,
    filteredRecipes,
    availableIngredients,
    isLoading,
    error,
    
    // Current filter values - return the parameter for timeOfDay
    timeOfDay: currentTimeOfDay,
    searchTerm,
    selectedDiet,
    selectedIngredients,
    
    // Update functions - these DON'T handle URLs or timeOfDay
    handleSearch,
    handleDietChange,
    handleIngredientsChange,
    resetFilters,
    refreshRecipes
  };
}