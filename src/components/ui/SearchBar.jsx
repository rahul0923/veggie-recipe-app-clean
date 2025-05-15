import { useRef } from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  const inputRef = useRef(null);
  
  const handleSearch = (e) => {
    const value = e.target.value;
    onSearch(value);
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
        onBlur={(e) => {
          // Prevent blur except when clicking the clear button
          if (e.relatedTarget !== document.querySelector('.search-clear')) {
            setTimeout(() => inputRef.current?.focus(), 10);
          }
        }}
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