// src/adapters/navigationAdapter.js
// Web implementation using React Router
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  return {
    navigate: (routeName, options = {}) => {
      // Convert React Navigation style to React Router
      if (typeof routeName === 'string') {
        navigate(routeName);
      } else if (options.params) {
        // Handle params
        const queryParams = new URLSearchParams();
        Object.entries(options.params).forEach(([key, value]) => {
          if (value) {
            queryParams.set(key, value);
          }
        });
        
        navigate(`${routeName}?${queryParams.toString()}`);
      }
    },
    
    goBack: () => {
      navigate(-1);
    },
    
    getParams: () => {
      // Combine route params and query params
      const queryParams = new URLSearchParams(location.search);
      const allParams = { ...params };
      
      for (const [key, value] of queryParams.entries()) {
        allParams[key] = value;
      }
      
      return allParams;
    },
    
    getCurrentRoute: () => {
      return location.pathname;
    }
  };
};

// For React Native, you would implement this using React Navigation