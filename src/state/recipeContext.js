// src/state/recipeContext.js
import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  // Shared state will go here
  
  return (
    <RecipeContext.Provider value={{}}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
}