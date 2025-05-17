// src/hooks/useIngredientFilter.js
import { useState, useEffect, useCallback, useRef } from 'react';

export function useIngredientFilter(initialAvailableIngredients, initialSelectedIngredients, onChangeCallback) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  
  // Using refs to store the latest values and prevent dependency issues
  const availableIngredientsRef = useRef(initialAvailableIngredients);
  const selectedIngredientsRef = useRef(initialSelectedIngredients);
  const onChangeCallbackRef = useRef(onChangeCallback);
  
  // Update refs when props change
  useEffect(() => {
    availableIngredientsRef.current = initialAvailableIngredients;
  }, [initialAvailableIngredients]);
  
  useEffect(() => {
    selectedIngredientsRef.current = initialSelectedIngredients;
  }, [initialSelectedIngredients]);
  
  useEffect(() => {
    onChangeCallbackRef.current = onChangeCallback;
  }, [onChangeCallback]);
  
  // Filter ingredients based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredIngredients([...availableIngredientsRef.current]);
    } else {
      const filtered = availableIngredientsRef.current.filter(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredIngredients(filtered);
    }
  }, [searchTerm]);
  
  // Toggle ingredient selection with a stable reference
  const toggleIngredient = useCallback((ingredient) => {
    const currentSelected = selectedIngredientsRef.current;
    let newSelected;
    
    if (currentSelected.includes(ingredient)) {
      newSelected = currentSelected.filter(item => item !== ingredient);
    } else {
      newSelected = [...currentSelected, ingredient];
    }
    
    // Call the callback with the new selection
    if (onChangeCallbackRef.current) {
      onChangeCallbackRef.current(newSelected);
    }
  }, []);
  
  // Clear all selected ingredients with a stable reference
  const clearAll = useCallback(() => {
    setSearchTerm('');
    if (onChangeCallbackRef.current) {
      onChangeCallbackRef.current([]);
    }
  }, []);
  
  return {
    searchTerm,
    setSearchTerm,
    filteredIngredients,
    toggleIngredient,
    clearAll
  };
}