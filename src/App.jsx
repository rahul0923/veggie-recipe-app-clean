// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import AppContent from './components/AppContent';
import './css/main.css';

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