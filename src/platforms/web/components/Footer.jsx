// src/components/layout/Footer.jsx - updated to match AppContent.jsx

import { Link, useLocation } from 'react-router-dom';

import { 
  MEAL_TIME_OPTIONS,
  DIET_OPTIONS 
} from '../../../core/constants/appConstants';

const Footer = ({ currentTime, selectedDiet, handleTimeChange, handleDietChange }) => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  
  // Check if on favorites page
  const isOnFavoritesPage = location.pathname === '/favorites';

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2 
            className="footer-logo"
            onClick={() => handleTimeChange('')}
            style={{ cursor: 'pointer' }}
          >
            GreenPlate
          </h2>
          <p className="footer-tagline">
            Delicious vegetarian & vegan recipes for everyone
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Explore</h4>
          <nav className="footer-nav">
            <div 
              className={`footer-link ${!currentTime ? 'footer-link-active' : ''}`}
              onClick={() => handleTimeChange('')}
              style={{ cursor: 'pointer', marginBottom: '0.75rem' }}
            >
              All Recipes
            </div>
            {/* Use MEAL_TIME_OPTIONS array */}
            {MEAL_TIME_OPTIONS.map(option => (
              <div 
                key={option.value}
                className={`footer-link ${currentTime === option.value ? 'footer-link-active' : ''}`}
                onClick={() => handleTimeChange(option.value)}
                style={{ cursor: 'pointer', marginBottom: '0.75rem' }}
              >
                {option.label}
              </div>
            ))}
          </nav>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Diet Types</h4>
          <nav className="footer-nav">
            {/* Use DIET_OPTIONS array, but skip 'all' option (index 0) */}
            {DIET_OPTIONS.slice(1).map(option => (
              <div 
                key={option.value}
                className={`footer-link ${selectedDiet === option.value ? 'footer-link-active' : ''}`}
                onClick={() => handleDietChange(option.value)}
                style={{ cursor: 'pointer', marginBottom: '0.75rem' }}
              >
                {option.label}
              </div>
            ))}
            {/* Add Favorites link */}
            <Link 
              to="/favorites"
              className={`footer-link ${isOnFavoritesPage ? 'footer-link-active' : ''}`}
              style={{ marginBottom: '0.75rem' }}
            >
              My Favorites
            </Link>
          </nav>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <div className="social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Pinterest</a>
            <a href="#" className="social-link">YouTube</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">
          © {currentYear} GreenPlate. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#" className="footer-link-small">Privacy Policy</a>
          <a href="#" className="footer-link-small">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;