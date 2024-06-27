import React from 'react';

const RecipeFilter = ({query, setQuery}) => (
  <div className="filter-container" tabIndex="1">
    <i className="fa fa-search"></i>
    <input
      type="text"
      placeholder="Search.."
      className=""
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  </div>
)

export default RecipeFilter;