// src/adapters/storageAdapter.js
// Web implementation
const WebStorageAdapter = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Error getting item from localStorage:', e);
      return null;
    }
  },
  
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('Error setting item in localStorage:', e);
      return false;
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing item from localStorage:', e);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Error clearing localStorage:', e);
      return false;
    }
  }
};

// For React Native, you would implement:
// const ReactNativeStorageAdapter = { ... } using AsyncStorage

// Export the platform-specific adapter
export const storageAdapter = WebStorageAdapter;