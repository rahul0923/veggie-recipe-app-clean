// src/services/filterService.js
export const filterService = {
  /**
   * Filter recipes by multiple criteria
   * @param {Array} recipes - All recipes
   * @param {Object} filters - Filter criteria
   * @returns {Array} Filtered recipes
   */
  filterRecipes: (recipes, filters = {}) => {
    const { timeOfDay, searchTerm, selectedDiet, selectedIngredients } = filters;
    
    let results = [...recipes];
    
    // Filter by time of day
    if (timeOfDay) {
      results = results.filter(recipe => recipe.mealTime === timeOfDay);
    }
    
    // Filter by diet
    if (selectedDiet && selectedDiet !== 'all') {
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
    if (selectedIngredients && selectedIngredients.length > 0) {
      results = results.filter(recipe => 
        selectedIngredients.every(selectedIngredient => 
          recipe.ingredients.some(ingredient => {
            const ingredientName = typeof ingredient === 'string' ? ingredient : ingredient.name;
            return ingredientName === selectedIngredient;
          })
        )
      );
    }
    
    return results;
  }
};