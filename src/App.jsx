// App.jsx
import { BrowserRouter as Router } from 'react-router-dom';

import AppContent from './components/AppContent'; // We'll create this new component

import './css/main.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ width: '100%', overflow: 'hidden' }}>
        <AppContent />
      </div>
    </Router>
  );
}

export default App;