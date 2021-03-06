import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import CardListPlaceholder from '../components/placeholders/CardListPlaceholder';
import RecipeList from '../components/RecipeList';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const { request, loading } = useHttp();

  const fetch = async () => {
    try {
      const recipes = await request('/api/recipe/all', 'GET');

      setRecipes(recipes);
    } catch (e) {
      console.log(e);
    }

  }
  useEffect(() => {
    fetch();
  }, [])

  return (
    <>
      <div className="recipes-top-panel">
        <div className="filters">Filters will be placed here</div>
        <Link className="add-recipe-btn" to="/create-recipe">Add Recipe</Link>
      </div>
      <div className="recipes">
        {loading && <CardListPlaceholder />}
        <RecipeList recipes={recipes} />
      </div>
    </>
  );
};

export default RecipesPage;
