// src/services/urlService.js - Web-specific functionality
export const urlService = {
  /**
   * Get URL parameters as an object
   * @param {string} search - URL search string
   * @returns {Object} Parameters as key-value pairs
   */
  getParams: (search) => {
    const params = new URLSearchParams(search);
    const result = {};
    
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    
    return result;
  },
  
  /**
   * Update URL with parameters
   * @param {Object} params - Parameters to set
   * @param {Function} navigate - Navigation function
   * @param {string} basePath - Base path (default: '/')
   */
  updateParams: (params, navigate, basePath = '/') => {
    const urlParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        urlParams.set(key, value);
      }
    });
    
    navigate(`${basePath}?${urlParams.toString()}`);
  }
};
