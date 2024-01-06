import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../utils/fetchHandler';

let resource;

const Recipe = () => {
  const { id } = useParams();
  if (!resource) {
    resource = fetchData(`/api/recipe/${id}`);
  }
  const recipe = resource.read();

  useEffect(() => {
    return () => {
      resource = null
    }
  }, [])


  return (
    <div className="recipe-card new">
      <div className="recipe-info">
        <div className="image-container">
            {recipe.image && <img src={recipe.image}/>}
        </div>
        <div className="recipe-title">{recipe.title}</div>
      </div>
      <div className="desc-container">
        <div className="ingredients">
          <div className="ingredients-title">Ingredients:</div>
            {recipe.ingredients && <div className="ingredient-list">
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
    </div>
  );
}

export default Recipe;