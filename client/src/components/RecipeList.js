import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultImage from '../images/default-image.jpg';

const RecipeList = ({ query }) => {
  const recipes = useSelector(state => state.recipes.recipes);
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.title.toLowerCase().includes(query.toLowerCase());
  });

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <>
      {filteredRecipes.map(recipe => {
        return (
          <Link className='recipe flip-container' key={recipe._id} to={`/recipes/${recipe._id}`}>
            <div className='txt-container'>
              <div className='title'>{recipe.title}</div>
              &#9918;
              <div className='cook-item'>15m</div>
            </div>
            <div className='image-container'>
              <img
                src={recipe.image ? recipe.image : defaultImage}
                onError={handleImageError}
                alt={recipe.title}
                loading='lazy'
              />
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default RecipeList;