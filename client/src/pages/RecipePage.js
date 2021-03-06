import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import CardPlaceholder from '../components/placeholders/CardPlaceholder';

const RecipePage = () => {
  const { id } = useParams();
  const { request } = useHttp();
  const {isAuthenticated} = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const recipe = await request(`/api/recipe/${id}`, 'GET');

      setRecipe(recipe);
    };

    fetchData();
  }, [isAuthenticated]);

  return (
    <>
    {recipe ? <div className="recipe-card new">
      <div className="recipe-info">
        <div className="image-container">
          {recipe.image && <img src={recipe.image} />}
        </div>
        <div className="recipe-title">{recipe.title}</div>
      </div>
      <div className="desc-container">
        <div className="ingredients">
          <div className="ingredients-title">Ingredients:</div>
          {recipe && recipe.ingredients.length > 0 && <div className="ingredient-list">
            {recipe.ingredients.map((item, i) => (
              <div className="ingredient tick" key={i}>
                <div>{item}</div>
              </div>
            ))}
          </div>}
        </div>
        <div className="procedures">
          <div className="title">Procedures:</div>
          <div className="item">
            {recipe.procedures}
          </div>
        </div>
      </div>
      </div> : <CardPlaceholder /> }
      </>

  );
};

export default RecipePage;
