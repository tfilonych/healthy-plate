import React, { Suspense } from 'react';
import { Await, defer, Link, useLoaderData } from 'react-router-dom';
import RecipeList from '../components/RecipeList';

const RecipesPage = () => {
  const { recipes } = useLoaderData()

  return (
    <>
      <div className="recipes-top-panel">
        <div className="filters">Filters will be placed here</div>
        <Link className="add-recipe-btn" to="/create-recipe">Add Recipe</Link>
      </div>
      <div className="recipes">
        <Suspense fallback={<h1>Loading ...</h1>}>
          <Await resolve={recipes}>
            {(resolvedRecipes) => <RecipeList recipes={resolvedRecipes} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

const getRecipes = async() => {
  const response = await fetch('/api/recipe/all');
  return await response.json();
}

const recipesLoader = async() => {
  return defer({
    recipes: getRecipes()
  })
}

export { RecipesPage, recipesLoader }
