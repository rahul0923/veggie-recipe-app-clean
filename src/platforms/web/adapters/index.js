// src/platforms/web/adapters/index.js
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// Storage Adapter
export const storageAdapter = {
  getItem: async (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  },
  
  setItem: async (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  },
  
  removeItem: async (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  }
};

// Platform Info
export const platformAdapter = {
  isWeb: true,
  isNative: false,
  platform: 'web'
};