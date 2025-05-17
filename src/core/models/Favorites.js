// src/core/models/Favorites.js
export class Favorites {
  constructor(ids = []) {
    this.ids = ids.map(id => Number(id));
  }
  
  contains(recipeId) {
    return this.ids.includes(Number(recipeId));
  }
  
  add(recipeId) {
    const numericId = Number(recipeId);
    if (!this.contains(numericId)) {
      this.ids.push(numericId);
    }
    return this;
  }
  
  remove(recipeId) {
    const numericId = Number(recipeId);
    this.ids = this.ids.filter(id => id !== numericId);
    return this;
  }
  
  toggle(recipeId) {
    return this.contains(recipeId) ? this.remove(recipeId) : this.add(recipeId);
  }
  
  clear() {
    this.ids = [];
    return this;
  }
  
  toJSON() {
    return this.ids;
  }
  
  static fromJSON(json) {
    try {
      const data = typeof json === 'string' ? JSON.parse(json) : json;
      return new Favorites(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error parsing favorites JSON:', e);
      return new Favorites();
    }
  }
}