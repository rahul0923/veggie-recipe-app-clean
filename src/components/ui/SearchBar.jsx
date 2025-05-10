// src/components/ui/SearchBar.jsx
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search recipes or ingredients..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <button 
          className="search-clear" 
          onClick={() => {
            setSearchTerm('');
            onSearch('');
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;