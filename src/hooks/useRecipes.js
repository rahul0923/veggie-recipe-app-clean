// src/hooks/useRecipes.js
import { useState, useEffect } from 'react';
import { recipeService } from '../services/recipeService';

export function useRecipes(timeOfDay = '') {
  // Original states from AppContent
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('all'); // 'all', 'vegetarian', or 'vegan'
  const [selectedIngredients, setSelectedIngredients] = useState([]);


  // Helper function for ingredients
  const getAllIngredients = (recipes) => {
    const ingredientSet = new Set();
    
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        // Handle both string and object ingredients
        const ingredientName = typeof ingredient === 'string' ? ingredient : ingredient.name;
        ingredientSet.add(ingredientName);
      });
    });
    
    return Array.from(ingredientSet).sort();
  };

  const [availableIngredients, setAvailableIngredients] = useState([]);
  
  // Update this when recipes change
useEffect(() => {
  if (recipes.length > 0) {
    setAvailableIngredients(getAllIngredients(recipes));
  }
}, [recipes]);


  // Load all recipes initially
  useEffect(() => {
    const loadRecipes = async () => {
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
    };
    
    loadRecipes();
  }, []);

  // This is the filtering logic from your AppContent component
  useEffect(() => {
    if (recipes.length === 0) return;
    
    let results = [...recipes];
    
    // Filter by time of day
    if (timeOfDay) {
      results = results.filter(recipe => recipe.mealTime === timeOfDay);
    }
    
    // Filter by diet
    if (selectedDiet !== 'all') {
      results = results.filter(recipe => recipe.type === selectedDiet);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(recipe => 
        recipe.name.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term) ||
        recipe.ingredients.some(ingredient => {
          const ingredientName = typeof ingredient === 'string' ? ingredient : ingredient.name;
          return ingredientName.toLowerCase().includes(term);
        })
      );
    }
    
    // Filter by selected ingredients
    if (selectedIngredients.length > 0) {
      results = results.filter(recipe => 
        selectedIngredients.every(selectedIngredient => 
          recipe.ingredients.some(ingredient => {
            const ingredientName = typeof ingredient === 'string' ? ingredient : ingredient.name;
            return ingredientName === selectedIngredient;
          })
        )
      );
    }
    
    setFilteredRecipes(results);
  }, [recipes, timeOfDay, searchTerm, selectedIngredients, selectedDiet]);

  // Functions to handle state changes
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const handleDietChange = (diet) => {
    setSelectedDiet(diet);
  };
  
  const handleIngredientsChange = (ingredients) => {
    setSelectedIngredients(ingredients);
  };

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
    // Raw setters (in case they're needed)
    setSearchTerm,
    setSelectedDiet,
    setSelectedIngredients
  };
}