// src/platforms/web/components/AppContent.jsx
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import DietFilter from '../../../shared/components/DietFilter';
import SearchBar from '../../../shared/components/SearchBar';
import IngredientFilter from '../../../shared/components/IngredientFilter';
import FavoritesPage from '../pages/FavoritesPage';

// Import our core hooks
import { useAppState } from '../../../core/hooks/useAppState';
import { useHomePageContent } from '../../../core/hooks/useHomePageContent';
// Import our web-specific hooks
import { useWebNavigation } from '../hooks/useWebNavigation';

function AppContent() {
  // Use our core app state hook
  const {
    isFilterOpen,
    timeOfDay,
    searchTerm,
    selectedDiet,
    selectedIngredients,
    availableIngredients,
    filteredRecipes,
    isLoading,
    error,
    
    setTimeOfDay,
    toggleFilter,
    handleSearch,
    handleDietChange,
    handleIngredientsChange,
    handleFavoriteToggle,
    handleResetAllFilters
  } = useAppState();

  // Use our web-specific navigation hook
  const { 
    updateTimeOfDayURL, 
    updateDietURL, 
    getURLParams,
    resetAllURLParams,
    navigate
  } = useWebNavigation();

  // Use our homepage content hook
  const { 
    getPageHeading, 
    showResetFilters, 
    getEmptyStateMessage, 
    hasRecipes 
  } = useHomePageContent({
    timeOfDay,
    searchTerm,
    selectedDiet,
    selectedIngredients,
    filteredRecipes,
    handleResetAllFilters
  });

  // Sync URL parameters with app state on initialization
  useEffect(() => {
    const params = getURLParams();
    
    if (params.meal) {
      setTimeOfDay(params.meal);
    }
    
    if (params.diet) {
      handleDietChange(params.diet);
    }
    
    if (params.search) {
      handleSearch(params.search);
    }
    
    if (params.ingredients.length > 0) {
      handleIngredientsChange(params.ingredients);
    }
  }, [getURLParams, handleDietChange, handleIngredientsChange, handleSearch, setTimeOfDay]);

  // Web-specific handlers that update URL
  const handleTimeChangeWithURL = (newTime) => {
    setTimeOfDay(newTime);
    updateTimeOfDayURL(newTime);
  };
  
  const handleDietChangeWithURL = (diet) => {
    handleDietChange(diet);
    updateDietURL(diet);
  };

  // Reset all filters and URL
  const handleResetAllFiltersWithURL = () => {
    handleResetAllFilters();
    resetAllURLParams();
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header currentTime={timeOfDay} setCurrentTime={handleTimeChangeWithURL} />
        <main className="container">
          <div className="loading-state">
            <p>Loading recipes...</p>
          </div>
        </main>
        <Footer 
          currentTime={timeOfDay} 
          selectedDiet={selectedDiet}   
          handleTimeChange={handleTimeChangeWithURL}
          handleDietChange={handleDietChangeWithURL}         
        />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header currentTime={timeOfDay} setCurrentTime={handleTimeChangeWithURL} />
        <main className="container">
          <div className="error-state">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </main>
        <Footer 
          currentTime={timeOfDay} 
          selectedDiet={selectedDiet}   
          handleTimeChange={handleTimeChangeWithURL}
          handleDietChange={handleDietChangeWithURL}         
        />
      </>
    );
  }

  // Home page content - now much cleaner with our hooks
  const HomePage = () => (
    <>
      <div className="search-and-filter">
        <div className="search-section">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </div>
        <div className="filter-toggle">
          <button 
            className="filter-button"
            onClick={toggleFilter}
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
            onChange={handleIngredientsChange}
          />
        </div>
      )}

      <h2 className="page-heading">{getPageHeading()}</h2>
      
      {hasRecipes ? (
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
          <p className="empty-message">{getEmptyStateMessage()}</p>
          {showResetFilters() && (
            <button
              className="reset-filters-button"
              onClick={handleResetAllFiltersWithURL}
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
        setCurrentTime={handleTimeChangeWithURL} 
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
        handleTimeChange={handleTimeChangeWithURL}
        handleDietChange={handleDietChangeWithURL}         
      />
    </>
  );
}

export default AppContent;