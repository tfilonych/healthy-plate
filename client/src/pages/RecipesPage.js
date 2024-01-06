import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import RecipeList from '../components/RecipeList';

const RecipesPage = () => (
  <>
    <div className="recipes-top-panel">
      <div className="filters">Filters will be placed here</div>
      <Link className="add-recipe-btn" to="/create-recipe">Add Recipe</Link>
    </div>
    <div className="recipes">
      <Suspense fallback={<h1>Loading ...</h1>}>
        <RecipeList/>
      </Suspense>
    </div>
  </>
);

export default RecipesPage;
