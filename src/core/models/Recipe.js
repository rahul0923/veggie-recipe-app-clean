// src/core/models/Recipe.js
export class Recipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.mealTime = data.mealTime;
    this.ingredients = data.ingredients;
    this.instructions = data.instructions || [];
    this.prepTime = data.prepTime;
    this.imageUrl = data.imageUrl;
    this.description = data.description;
    this.videoUrl = data.videoUrl;
  }
  
  isVegan() {
    return this.type === 'vegan';
  }
  
  isVegetarian() {
    return this.type === 'vegetarian' || this.isVegan();
  }
  
  hasIngredient(ingredientName) {
    return this.ingredients.some(ingredient => {
      const name = typeof ingredient === 'string' ? ingredient : ingredient.name;
      return name.toLowerCase() === ingredientName.toLowerCase();
    });
  }
  
  getFormattedTime() {
    return this.prepTime; // Already formatted in data, but could be enhanced
  }
  
  getVideoId() {
    if (!this.videoUrl) return null;
    
    // Extract YouTube video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = this.videoUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
}

