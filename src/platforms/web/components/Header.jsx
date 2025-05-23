// src/platforms/web/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useFavorites } from '../../../core/contexts/FavoritesContext';
import { MEAL_TIME_OPTIONS } from '../../../core/constants/appConstants';
import { useWebNavigation } from '../hooks/useWebNavigation';

const Header = ({ currentTime, setCurrentTime }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favoriteIds } = useFavorites();
  const { navigate, location } = useWebNavigation();
  
  // Check if we're on the favorites page - this is web-specific routing logic
  const isOnFavoritesPage = location.pathname === '/favorites';

  const handleTimeChange = (newTime) => {
    setCurrentTime(newTime);
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
          {/* Favorites link */}
          <Link 
            to="/favorites" 
            className={`nav-button ${isOnFavoritesPage ? 'active' : ''}`}
          >
            ★ Favorites
            {favoriteIds && favoriteIds.length > 0 && (
              <span className="favorites-count">{favoriteIds.length}</span>
            )}
          </Link>
    
          {MEAL_TIME_OPTIONS.map(option => (
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
            <Link
              to="/favorites"
              className={`nav-button ${isOnFavoritesPage ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ★ Favorites
            </Link>
            {MEAL_TIME_OPTIONS.map(option => (
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