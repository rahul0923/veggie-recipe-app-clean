// src/components/ui/IngredientFilter.jsx
import { memo, useMemo } from 'react';

import { useIngredientFilter } from '../../core/hooks/useIngredientFilter';

const IngredientFilter = ({ availableIngredients, selectedIngredients, onChange }) => {
  // Use the custom hook with memoized props
  const {
    searchTerm,
    setSearchTerm,
    filteredIngredients,
    toggleIngredient,
    clearAll
  } = useIngredientFilter(
    availableIngredients,
    selectedIngredients,
    onChange
  );
  
  // Use a memoized render for the ingredient list to prevent excessive re-renders
  const ingredientListItems = useMemo(() => {
    return filteredIngredients.map(ingredient => (
      <label key={ingredient} className="ingredient-item-label">
        <input
          type="checkbox"
          checked={selectedIngredients.includes(ingredient)}
          onChange={() => toggleIngredient(ingredient)}
          className="ingredient-checkbox"
        />
        <span className="ingredient-name">{ingredient}</span>
      </label>
    ));
  }, [filteredIngredients, selectedIngredients, toggleIngredient]);
  
  // Similarly, memoize the selected ingredients tags
  const selectedIngredientTags = useMemo(() => {
    return selectedIngredients.map(ingredient => (
      <span key={ingredient} className="selected-ingredient-tag">
        {ingredient}
        <button 
          className="remove-ingredient" 
          onClick={() => toggleIngredient(ingredient)}
        >
          ×
        </button>
      </span>
    ));
  }, [selectedIngredients, toggleIngredient]);
  
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
              {selectedIngredientTags}
            </div>
          </>
        )}
      </div>
      
      <div className="ingredient-list">
        {ingredientListItems}
        {filteredIngredients.length === 0 && (
          <p className="no-ingredients">No ingredients match your search.</p>
        )}
      </div>
    </div>
  );
};

// Ensure the component doesn't re-render unnecessarily
export default memo(IngredientFilter);