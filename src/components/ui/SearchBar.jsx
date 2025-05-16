import { useRef } from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  const inputRef = useRef(null);
  
  const handleSearch = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

    // Modify the blur handler to check what was clicked
  const handleBlur = (e) => {
    // Get what was clicked (relatedTarget is what received focus)
    const clickedElement = e.relatedTarget;
    
    // If it's not another input field, refocus
    if (!clickedElement || 
        (clickedElement.tagName !== 'INPUT' && 
         clickedElement.tagName !== 'TEXTAREA')) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
    // Otherwise, let the other input get focus
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
        // Add these focus handling attributes directly on the input
        autoFocus
        onBlur={handleBlur}
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