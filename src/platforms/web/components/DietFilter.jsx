// src/components/ui/DietFilter.jsx
import React from 'react';

const DietFilter = ({ selectedDiet, onChange }) => {
  const handleDietChange = (diet) => {
    onChange(diet);
  };

  return (
    <div className="diet-filter">
      <h3 className="diet-filter-title">Diet Preference</h3>
      
      <div className="diet-options">
        <label className="diet-option">
          <input
            type="radio"
            name="diet"
            value="all"
            checked={selectedDiet === 'all'}
            onChange={() => handleDietChange('all')}
            className="diet-radio"
          />
          <span className="diet-label">All Recipes</span>
        </label>
        
        <label className="diet-option">
          <input
            type="radio"
            name="diet"
            value="vegetarian"
            checked={selectedDiet === 'vegetarian'}
            onChange={() => handleDietChange('vegetarian')}
            className="diet-radio"
          />
          <span className="diet-label">Vegetarian Only</span>
        </label>
        
        <label className="diet-option">
          <input
            type="radio"
            name="diet"
            value="vegan"
            checked={selectedDiet === 'vegan'}
            onChange={() => handleDietChange('vegan')}
            className="diet-radio"
          />
          <span className="diet-label">Vegan Only</span>
        </label>
      </div>
    </div>
  );
};

export default DietFilter;