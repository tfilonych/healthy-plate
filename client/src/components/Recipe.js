import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Recipe = () => {
  const { id } = useParams();
  const recipes = useSelector(state => state.recipes.recipes);
  const recipe = recipes.find(recipe => recipe._id === id);

  return (
    <div className='recipe-card new'>
      <div className='recipe-info'>
        <div className='image-container'>
          {recipe.image && <img alt={recipe.title} src={recipe.image} />}
        </div>
        <div className='recipe-title'>{recipe.title}</div>
      </div>
      <div className='desc-container'>
        <div className='ingredients'>
          <div className='ingredients-title'>Ingredients:</div>
          {recipe.ingredients && <div className='ingredient-list'>
            {recipe.ingredients.map((item, i) => (
              <div className='ingredient tick' key={i}>
                <div>{item}</div>
              </div>
            ))}
          </div>}
        </div>
        <div className='procedures'>
          <div className='title'>Procedures:</div>
          <div className='item'>
            {recipe.procedures}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;