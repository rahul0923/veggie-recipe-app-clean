import { useRef, useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  const inputRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const lastTypedTimeRef = useRef(0);
  const typingTimeoutRef = useRef(null);
  
  const handleSearch = (e) => {
    const value = e.target.value;
    onSearch(value);
    
    // User is typing - update the state and timestamp
    setIsTyping(true);
    lastTypedTimeRef.current = Date.now();
    
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set a timeout to turn off typing mode after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);
  
  const handleBlur = (e) => {
    // If the user was typing within the last 2 seconds, 
    // AND isn't clicking on a form control or nav element, regain focus
    const timeSinceLastType = Date.now() - lastTypedTimeRef.current;
    const clickedElement = e.relatedTarget;
    
    // List of classes that shouldn't trigger refocus
    const navigationClassNames = [
      'footer-link',
      'nav-button',
      'footer-link-active',
      'logo',
      'logo-link',
      'reset-button',
      'filter-button',
      'social-link'
    ];
    
    // Check if clicked element or its parent has one of these classes
    const isNavigationElement = clickedElement && (
      navigationClassNames.some(className => 
        clickedElement.classList && clickedElement.classList.contains(className)
      ) ||
      (clickedElement.parentElement && navigationClassNames.some(className => 
        clickedElement.parentElement.classList && 
        clickedElement.parentElement.classList.contains(className)
      ))
    );
    
    // Also check for standard interactive elements
    const isInteractiveElement = clickedElement && (
      clickedElement.tagName === 'A' ||
      clickedElement.tagName === 'BUTTON' ||
      clickedElement.tagName === 'INPUT' ||
      clickedElement.tagName === 'TEXTAREA' ||
      clickedElement.tagName === 'SELECT'
    );
    
    // If actively typing AND not clicking a navigation/interactive element, regain focus
    if (isTyping && timeSinceLastType < 2000 && !isNavigationElement && !isInteractiveElement) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };
  
  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Search recipes or ingredients..."
        value={searchTerm || ''}
        onChange={handleSearch}
        onFocus={() => {
          // When the input gains focus, consider the user as typing
          if (searchTerm) {
            setIsTyping(true);
            lastTypedTimeRef.current = Date.now();
          }
        }}
        onBlur={handleBlur}
        // Keep autoFocus for initial focus
        autoFocus
      />
      {searchTerm && (
        <button 
          className="search-clear" 
          onClick={() => {
            onSearch('');
            setTimeout(() => inputRef.current?.focus(), 10);
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;