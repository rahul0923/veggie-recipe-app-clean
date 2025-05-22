// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';

import { FavoritesProvider } from './core/contexts/FavoritesContext';
import AppContent from './platforms/web/components/AppContent';
import './platforms/web/styles/main.css';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div className="app-wrapper" style={{ width: '100%', overflow: 'hidden' }}>
          <AppContent />
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;