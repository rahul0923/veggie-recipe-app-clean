import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ currentTime, setCurrentTime }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const timeOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'snack', label: 'Snacks' },
    { value: 'dinner', label: 'Dinner' }
  ];

  const handleTimeChange = (newTime) => {
    setCurrentTime(newTime);
    navigate('/'); // Navigate back to the home page
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