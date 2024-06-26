import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchData from '../utils/fetchHandler';

const defaultImagePath = '/images/default-image.jpg';
let resource;
const RecipeList = ({ query }) => {
  const controller = new AbortController();
  const signal = controller.signal;

  if (!resource) {
    resource = fetchData('/api/recipes', {
      signal: signal
    });
  }
  const recipes = resource.read().data;
  const filterMap = (query) => {
    if (!recipes) return;
    return recipes.filter(recipe => {
      return recipe.title.toLowerCase().includes(query.toLowerCase());
    });
  };
  const filteredRecipes = filterMap(query);

  useEffect(() => {
    return () => {
      resource = null;
      controller.abort();
    };

  }, []);

  const handleImageError = (e) => {
    e.target.src = defaultImagePath;
  };

  return (
    <>
      {filteredRecipes.map(recipe => {
        return (
          <Link className='recipe flip-container' key={recipe._id} to={`/recipes/${recipe._id}`}>
            <div className='txt-container'>
              <div className='title'>{recipe.title}</div>
              {/*<div className="cook-item">15m</div>*/}
            </div>
            <div className='image-container fade-in-image'>
              <img
                src={recipe.image ? recipe.image : defaultImagePath}
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