// src/services/recipeService.js
import recipeData from '../../data/recipes.json';

// Just keep a clean copy of recipe data
const recipes = [...recipeData];

export const recipeService = {
  /**
   * Get all recipes
   * @returns {Promise<Array>} Recipes array
   */
  getAllRecipes: () => {
    return Promise.resolve(recipes);
  },
  
  /**
   * Get recipe by ID
   * @param {number|string} id - Recipe ID
   * @returns {Promise<Object|null>} Recipe object or null if not found
   */
  getRecipeById: (id) => {
    const recipe = recipes.find(r => r.id === parseInt(id));
    return Promise.resolve(recipe || null);
  }
};