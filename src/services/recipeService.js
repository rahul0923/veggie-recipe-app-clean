// src/services/recipeService.js
import recipeData from '../data/recipes.json';

export const recipeService = {
  // Get all recipes
  getAllRecipes: () => {
    return Promise.resolve(recipeData);
  },
  
  // Get recipe by ID
  getRecipeById: (id) => {
    const recipe = recipeData.find(r => r.id === parseInt(id));
    return Promise.resolve(recipe);
  }
};