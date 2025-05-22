// src/platforms/web/components/AppContent.jsx
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import DietFilter from './DietFilter';
import SearchBar from './SearchBar';
import IngredientFilter from './IngredientFilter';
import FavoritesPage from '../pages/FavoritesPage';

import { useMealTime } from '../../../core/hooks/useMealTime';
import { useRecipes } from '../../../core/hooks/useRecipes';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  
  // Use our custom hooks
  const { timeOfDay, setTimeOfDay } = useMealTime();
  
  // IMPORTANT: Pass the current timeOfDay to useRecipes
  const { 
    filteredRecipes, 
    searchTerm, 
    selectedDiet, 
    selectedIngredients,
    availableIngredients,
    handleSearch,
    handleDietChange,
    handleIngredientsChange,
    refreshRecipes,
    isLoading,
    error
  } = useRecipes(timeOfDay); // Pass current timeOfDay here

  // Function to refresh recipe list after favorites change
  const handleFavoriteToggle = async () => {
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
  }, [handleSearch]);
  
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
    handleIngredientsChange(ingredients);
  }, [handleIngredientsChange]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header currentTime={timeOfDay} setCurrentTime={handleTimeChange} />
        <main className="container">
          <div className="loading-state">
            <p>Loading recipes...</p>
          </div>
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

  // Error state
  if (error) {
    return (
      <>
        <Header currentTime={timeOfDay} setCurrentTime={handleTimeChange} />
        <main className="container">
          <div className="error-state">
            <p>Error: {error}</p>
            <button onClick={refreshRecipes}>Try Again</button>
          </div>
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
        {timeOfDay === 'snack' ? 'Evening Snacks' : 
         timeOfDay ? `${timeOfDay} Recipes` : 'All Recipes'}
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
              : timeOfDay 
                ? `No recipes found for ${timeOfDay}.`
                : 'No recipes available.'}
          </p>
          {/* Reset Filters Button */}
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