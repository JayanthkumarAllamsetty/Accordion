// SearchBar.jsx

import React from 'react';

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search celebrities..." onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
