import React from 'react';

const RecipeFilter = ({ query, setQuery }) => (
  <div className="filter-container">
    <input
      type="text"
      placeholder="search"
      className=""
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  </div>
)

export default RecipeFilter;