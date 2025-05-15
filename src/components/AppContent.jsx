// src/components/AppContent.jsx
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Header from './layout/Header';
import Footer from './layout/Footer';
import RecipeCard from './recipe/RecipeCard';
import RecipeDetail from './recipe/RecipeDetail';
import DietFilter from './ui/DietFilter';
import SearchBar from './ui/SearchBar';
import IngredientFilter from './ui/IngredientFilter';

import recipeData from '../data/recipes.json';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [timeOfDay, setTimeOfDay] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  const [selectedDiet, setSelectedDiet] = useState('all'); // 'all', 'vegetarian', or 'vegan'
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [availableIngredients] = useState(getAllIngredients());
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Helper function for ingredients
  function getAllIngredients() {
    const ingredientSet = new Set();
    
    recipeData.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        // Handle both string and object ingredients
        const ingredientName = typeof ingredient === 'string' ? ingredient : ingredient.name;
        ingredientSet.add(ingredientName);
      });
    });
    
    return Array.from(ingredientSet).sort();
  }

  // Extract query parameters when location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const mealParam = params.get('meal');
    if (mealParam) {
      setTimeOfDay(mealParam);
    }
    
    const dietParam = params.get('diet');
    if (dietParam) {
      setSelectedDiet(dietParam);
    }
    
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    const ingredientsParam = params.get('ingredients');
    if (ingredientsParam) {
      setSelectedIngredients(ingredientsParam.split(','));
    }
  }, [location.search]);

  // Determine time of day automatically when the component mounts
  useEffect(() => {
    if (!timeOfDay) {
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
    }
  }, [timeOfDay]);

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

  // Create stable handler functions with useCallback
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    navigate(`/?${params.toString()}`);
  }, [location.search, navigate]);
  
  const handleTimeChange = useCallback((newTime) => {
    setTimeOfDay(newTime);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    if (newTime) {
      params.set('meal', newTime);
    } else {
      params.delete('meal');
    }
    navigate(`/?${params.toString()}`);
  }, [location.search, navigate]);
  
  const handleDietChange = useCallback((diet) => {
    setSelectedDiet(diet);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    if (diet && diet !== 'all') {
      params.set('diet', diet);
    } else {
      params.delete('diet');
    }
    navigate(`/?${params.toString()}`);
  }, [location.search, navigate]);
  
  const handleIngredientsChange = useCallback((ingredients) => {
    setSelectedIngredients(ingredients);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    if (ingredients && ingredients.length > 0) {
      params.set('ingredients', ingredients.join(','));
    } else {
      params.delete('ingredients');
    }
    navigate(`/?${params.toString()}`);
  }, [location.search, navigate]);

  const HomePage = () => (
    <>
      <div className="search-and-filter">
        <div className="search-section">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
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
            onChange={handleDietChange}
          />
          <IngredientFilter 
            availableIngredients={availableIngredients}
            selectedIngredients={selectedIngredients}
            onChange={handleIngredientsChange}
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
                navigate('/');
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
    <>
      <Header 
        currentTime={timeOfDay} 
        setCurrentTime={handleTimeChange} 
      />
      
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>

      <Footer 
        currentTime={timeOfDay} 
        selectedDiet={selectedDiet}   
        handleTimeChange={handleTimeChange}
        handleDietChange={handleDietChange}         
      />
    </>
  );
}

export default AppContent;