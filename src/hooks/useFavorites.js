// src/hooks/useFavorites.js
import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  
  // We'll implement this later
  
  return { favorites, setFavorites };
}