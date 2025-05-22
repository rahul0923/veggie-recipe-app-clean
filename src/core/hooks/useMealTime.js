// src/core/hooks/useMealTime.js
import { useState, useEffect } from 'react';

export function useMealTime() {
  const [timeOfDay, setTimeOfDay] = useState('');
  
  // Auto-detect time of day on initial load only
  useEffect(() => {
    if (!timeOfDay) {
      const determineTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) {
          return 'breakfast';
        } else if (hour >= 11 && hour < 15) {
          return 'lunch';
        } else if (hour >= 15 && hour < 18) {
          return 'snack';
        } else {
          return 'dinner';
        }
      };
      
      setTimeOfDay(determineTimeOfDay());
    }
  }, [timeOfDay]);
  
  return { timeOfDay, setTimeOfDay };
}