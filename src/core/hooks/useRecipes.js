// src/hooks/useRecipes.js - Platform-agnostic version
import { useState, useEffect, useCallback } from 'react';

import { recipeService } from '../services/recipeService';
import { filterService } from '../services/filterService';
import { ingredientService } from '../services/ingredientService';

export function useRecipes(timeOfDay = '') {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  
  // Load all recipes initially
  useEffect(() => {
    const loadRecipes = async () => {
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
      
      // Get all unique ingredients
      const ingredients = ingredientService.getAllIngredients(data);
      setAvailableIngredients(ingredients);
    };
    
    loadRecipes();
  }, []);

  // Apply filters whenever criteria change
  useEffect(() => {
    if (recipes.length === 0) return;
    
    const filters = {
      timeOfDay,
      searchTerm,
      selectedDiet,
      selectedIngredients
    };
    
    const results = filterService.filterRecipes(recipes, filters);
    setFilteredRecipes(results);
  }, [recipes, timeOfDay, searchTerm, selectedIngredients, selectedDiet]);

  // Functions to handle state changes
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
      console.error("Error refreshing recipes:", error);
    }
  }, []);

  return {
    // Data
    recipes,
    filteredRecipes,
    // State values
    searchTerm,
    selectedDiet,
    selectedIngredients,
    availableIngredients,
    // Handler functions
    handleSearch,
    handleDietChange,
    handleIngredientsChange,
    refreshRecipes,
    // Raw settings
    setSearchTerm,
    setSelectedDiet,
    setSelectedIngredients
  };
}
