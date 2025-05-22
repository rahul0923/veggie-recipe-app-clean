import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useFavorites } from '../../context/FavoritesContext';

const Header = ({ currentTime, setCurrentTime }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  // Optionally use the favorites context to show count
  const { favoriteIds } = useFavorites ? useFavorites() : { favoriteIds: [] };

  // Check if we're on the favorites page
  const isOnFavoritesPage = location.pathname === '/favorites';

  const timeOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'snack', label: 'Snacks' },
    { value: 'dinner', label: 'Dinner' }
  ];

  const handleTimeChange = (newTime) => {
    setCurrentTime(newTime);
    // Create a new URLSearchParams object from the current search
    const queryParams = new URLSearchParams(location.search);
    
    // Update or remove the meal parameter
    if (newTime) {
      queryParams.set('meal', newTime);
    } else {
      queryParams.delete('meal');
    }
    
    // Preserve other query parameters
    const newSearch = queryParams.toString();
    const newURL = newSearch ? `/?${newSearch}` : '/';
    
    navigate(newURL); // Navigate back to the home page
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
      <Link to="/" className="logo-link" style={{ textDecoration: 'none' }}>
          <div className="logo">
            GreenPlate
            <span className="logo-badge">Veg & Vegan</span>
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
        
        {/* Desktop navigation */}
        <nav className="nav">
          {/* Add favorites link */}
          <Link 
            to="/favorites" 
            className={`nav-button ${isOnFavoritesPage ? 'active' : ''}`}
          >
            {/* Star icon */}
            ★ Favorites
            {/* Optional: Add count badge if you have favorites */}
            {favoriteIds && favoriteIds.length > 0 && (
              <span className="favorites-count">{favoriteIds.length}</span>
            )}
          </Link>
    
          {timeOptions.map(option => (
            <button
              key={option.value}
              className={`nav-button ${currentTime === option.value ? 'active' : ''}`}
              onClick={() => handleTimeChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu active">
          <div className="mobile-grid">
            {/* Add favorites link to mobile menu too */}
            <Link
              to="/favorites"
              className={`nav-button ${isOnFavoritesPage ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ★ Favorites
            </Link>
            {timeOptions.map(option => (
              <button
                key={option.value}
                className={`nav-button ${currentTime === option.value ? 'active' : ''}`}
                onClick={() => handleTimeChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;