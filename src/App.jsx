import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import RecipeCard from './components/recipe/RecipeCard';
import RecipeDetail from './components/recipe/RecipeDetail';
import DietFilter from './components/ui/DietFilter';
import SearchBar from './components/ui/SearchBar';
import IngredientFilter from './components/ui/IngredientFilter';

import recipeData from './data/recipes.json';

import './css/main.css';

function App() {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  const [selectedDiet, setSelectedDiet] = useState('all'); // 'all', 'vegetarian', or 'vegan'
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const getAllIngredients = () => {
    const ingredientSet = new Set();
    
    recipeData.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        // Handle both string and object ingredients
        const ingredientName = typeof ingredient === 'string' ? ingredient : ingredient.name;
        ingredientSet.add(ingredientName);
      });
    });
    
    return Array.from(ingredientSet).sort();
  };
  
  // Then add this to your component state:
  const [availableIngredients] = useState(getAllIngredients());
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Determine time of day automatically when the component mounts
  useEffect(() => {
    const determineTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 11) {
        return 'breakfast';
      } else if (hour >= 11 && hour < 15) {
        return 'lunch';
      } else if (hour >= 15 && hour < 18) {
        return 'snack';
      } else {
        return 'dinner';
      }
    };
    
    setTimeOfDay(determineTimeOfDay());
  }, []);

  // Filter recipes based on time of day and search term
  useEffect(() => {
    let results = recipeData;
    
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
  }, [timeOfDay, searchTerm, selectedIngredients, selectedDiet]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const HomePage = () => (
    <>
      <div className="search-and-filter">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="filter-toggle">
          <button 
            className="filter-button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter Recipes
            {selectedDiet !== 'all' && (
              <span className="filter-badge">{selectedDiet}</span>
            )}
            {isFilterOpen ? " ▲" : " ▼"}
          </button>
        </div>
      </div>
      
      {isFilterOpen && (
        <div className="filters-container">
          <DietFilter 
            selectedDiet={selectedDiet}
            onChange={setSelectedDiet}
          />
          <IngredientFilter 
            availableIngredients={availableIngredients}
            selectedIngredients={selectedIngredients}
            onChange={setSelectedIngredients}
          />
        </div>
      )}

      <h2 className="page-heading">
        {timeOfDay === 'snack' ? 'Evening Snacks' : `${timeOfDay} Recipes`}
        {selectedDiet !== 'all' && ` (${selectedDiet} only)`}
        {searchTerm && ` matching "${searchTerm}"`}
        {selectedIngredients.length > 0 && ` with ${selectedIngredients.join(', ')}`}
      </h2>
      
      {filteredRecipes.length > 0 ? (
        <div className="recipe-grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-message">
            {searchTerm || selectedIngredients.length > 0 || selectedDiet !== 'all'
              ? `No recipes found with the current filters. Try adjusting your search or filters.` 
              : `No recipes found for ${timeOfDay}.`}
          </p>
          {/* Add the Reset Filters Button here */}
          {(searchTerm || selectedIngredients.length > 0 || selectedDiet !== 'all') && (
            <button
              className="reset-filters-button"
              onClick={() => {
                setSearchTerm('');
                setSelectedIngredients([]);
                setSelectedDiet('all');
              }}
            >
              Reset All Filters
            </button>
          )}
        </div>
      )}
    </>
  );

  return (
    <Router>
      <div className="app-wrapper" style={{ width: '100%', overflow: 'hidden' }}>
        <Header currentTime={timeOfDay} setCurrentTime={setTimeOfDay} />
        
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;