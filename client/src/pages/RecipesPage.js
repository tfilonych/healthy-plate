import React, { Suspense, useDeferredValue, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import RecipeFilter from '../components/RecipeFilter';

const RecipesPage = () => {
  const [ query, setQuery ] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <div className="recipes-top-panel">
        <RecipeFilter setQuery={setQuery}/>
        <Link className="add-recipe-btn" to="/create-recipe">Add Recipe</Link>
      </div>
      <div className="recipes">
        <Suspense fallback={<h1>Loading ...</h1>}>
          <RecipeList query={deferredQuery}/>
        </Suspense>
      </div>
    </>
  );
}

export default RecipesPage;
