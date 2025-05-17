// src/styles/styleUtils.js - Utils to convert tokens to platform-specific styles
export const createWebStyles = (styleObj) => {
  // For web, just return CSS styles
  return styleObj;
};

export const createStyleSheets = (styleDefs) => {
  // On web, simply convert to CSS class names
  // For React Native, this would convert to StyleSheet.create()
  const result = {};
  
  for (const [key, styles] of Object.entries(styleDefs)) {
    result[key] = createWebStyles(styles);
  }
  
  return result;
};
