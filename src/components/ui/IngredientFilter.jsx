// src/components/ui/IngredientFilter.jsx
import { useState, useEffect } from 'react';

const IngredientFilter = ({ availableIngredients, selectedIngredients, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState(availableIngredients);
  
  // Filter ingredients based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredIngredients(availableIngredients);
    } else {
      const filtered = availableIngredients.filter(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredIngredients(filtered);
    }
  }, [searchTerm, availableIngredients]);
  
  // Toggle ingredient selection
  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      onChange(selectedIngredients.filter(item => item !== ingredient));
    } else {
      onChange([...selectedIngredients, ingredient]);
    }
  };
  
  // Clear all selected ingredients
  const clearAll = () => {
    onChange([]);
    setSearchTerm('');
  };
  
  return (
    <div className="ingredient-filter">
      <div className="ingredient-filter-header">
        <h3 className="ingredient-filter-title">Filter by Ingredients</h3>
        {selectedIngredients.length > 0 && (
          <button className="clear-filter" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>
      
      <div className="ingredient-search">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ingredient-search-input"
        />
      </div>
      
      <div className="selected-ingredients">
        {selectedIngredients.length > 0 && (
          <>
            <div className="selected-ingredients-label">Selected:</div>
            <div className="selected-ingredients-tags">
              {selectedIngredients.map(ingredient => (
                <span key={ingredient} className="selected-ingredient-tag">
                  {ingredient}
                  <button 
                    className="remove-ingredient" 
                    onClick={() => toggleIngredient(ingredient)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="ingredient-list">
        {filteredIngredients.map(ingredient => (
          <label key={ingredient} className="ingredient-item-label">
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => toggleIngredient(ingredient)}
              className="ingredient-checkbox"
            />
            <span className="ingredient-name">{ingredient}</span>
          </label>
        ))}
        {filteredIngredients.length === 0 && (
          <p className="no-ingredients">No ingredients match your search.</p>
        )}
      </div>
    </div>
  );
};

export default IngredientFilter;