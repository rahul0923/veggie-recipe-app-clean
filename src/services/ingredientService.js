// src/services/ingredientService.js
export const ingredientService = {
  /**
   * Get all unique ingredients from recipes
   * @param {Array} recipes - Array of recipe objects
   * @returns {Array} Sorted array of unique ingredients
   */
  getAllIngredients: (recipes) => {
    const ingredientSet = new Set();
    
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        // Handle both string and object ingredients
        const ingredientName = typeof ingredient === 'string' ? ingredient : ingredient.name;
        ingredientSet.add(ingredientName);
      });
    });
    
    return Array.from(ingredientSet).sort();
  },
  
  /**
   * Filter recipes by ingredient(s)
   * @param {Array} recipes - Array of recipe objects
   * @param {Array} ingredients - Ingredients to filter by
   * @returns {Array} Filtered recipes
   */
  filterByIngredients: (recipes, ingredients) => {
    if (!ingredients || ingredients.length === 0) {
      return recipes;
    }
    
    return recipes.filter(recipe => 
      ingredients.every(selectedIngredient => 
        recipe.ingredients.some(ingredient => {
          const ingredientName = typeof ingredient === 'string' ? ingredient : ingredient.name;
          return ingredientName === selectedIngredient;
        })
      )
    );
  }
};