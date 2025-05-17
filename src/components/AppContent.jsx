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
import FavoritesPage from './pages/FavoritesPage';

import { useMealTime } from '../hooks/useMealTime';
import { useRecipes } from '../hooks/useRecipes';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  
  // Use our custom hooks
  const { timeOfDay, setTimeOfDay } = useMealTime();
  const { 
    filteredRecipes, 
    searchTerm, 
    selectedDiet, 
    selectedIngredients,
    availableIngredients,
    handleSearch,
    handleDietChange,
    handleIngredientsChange,
    refreshRecipes // Add this to useRecipes hook if not already there
  } = useRecipes(timeOfDay);

  // Function to refresh recipe list after favorites change
  const handleFavoriteToggle = async () => {
    // Use the refreshRecipes function from the hook
    await refreshRecipes();
  };

  // Extract query parameters when location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const mealParam = params.get('meal');
    if (mealParam) {
      setTimeOfDay(mealParam);
    }
    
    const dietParam = params.get('diet');
    if (dietParam) {
      handleDietChange(dietParam);
    }
    
    const searchParam = params.get('search');
    if (searchParam) {
      handleSearch(searchParam);
    }
    
    const ingredientsParam = params.get('ingredients');
    if (ingredientsParam) {
      handleIngredientsChange(ingredientsParam.split(','));
    }
  }, [location.search, handleDietChange, handleIngredientsChange, handleSearch, setTimeOfDay]);

  // Create stable handler functions with useCallback
  const handleSearchWithURL = useCallback((term) => {
    handleSearch(term);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    navigate(`/?${params.toString()}`);
  }, [location.search, navigate, handleSearch]);
  
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
  }, [location.search, navigate, setTimeOfDay]);
  
  const handleDietChangeWithURL = useCallback((diet) => {
    handleDietChange(diet);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    if (diet && diet !== 'all') {
      params.set('diet', diet);
    } else {
      params.delete('diet');
    }
    navigate(`/?${params.toString()}`);
  }, [location.search, navigate, handleDietChange]);
  

  const handleIngredientsChangeWithURL = useCallback((ingredients) => {
    // Only update state, don't update URL for ingredients
    handleIngredientsChange(ingredients);
    
    // Skip the URL update part completely
    // This prevents the navigation -> state update -> render -> navigation cycle
  }, [handleIngredientsChange]);

  const HomePage = () => (
    <>
      <div className="search-and-filter">
        <div className="search-section">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearchWithURL} />
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
            onChange={handleDietChangeWithURL}
          />
          <IngredientFilter 
            availableIngredients={availableIngredients}
            selectedIngredients={selectedIngredients}
            onChange={handleIngredientsChangeWithURL}
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
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe}
            />
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
                handleSearchWithURL('');
                handleIngredientsChangeWithURL([]);
                handleDietChangeWithURL('all');
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
          <Route path="/recipe/:id" element={
            <RecipeDetail onFavoriteToggle={handleFavoriteToggle} />
          } />
          <Route path="/favorites" element={
            <FavoritesPage onFavoriteToggle={handleFavoriteToggle} />
          } />
        </Routes>
      </main>

      <Footer 
        currentTime={timeOfDay} 
        selectedDiet={selectedDiet}   
        handleTimeChange={handleTimeChange}
        handleDietChange={handleDietChangeWithURL}         
      />
    </>
  );
}

export default AppContent;