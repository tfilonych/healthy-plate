import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../images/default-image.jpg';
import fetchData from '../utils/fetchHandler';

const memorize = (fn) => {
  const cache = {};

  return (input) => {
    if (cache[input] !== undefined) {
      console.log('Result is cached');
      return cache[input];
    }
    const result = fn(input);
    console.log(result);
    cache[input] = result;
    return result;
  };
};

let resource;

const RecipeList = ({ query }) => {
  const controller = new AbortController();
  const signal = controller.signal;
  if (!resource) {
    resource = fetchData('/api/recipe/all', {
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
  const filteredRecipes = memorize(filterMap)(query);

  useEffect(() => {

    return () => {
      resource = null;
      controller.abort();
    };

  }, []);

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
              {/*<div className="cook-item">15m</div>*/}
            </div>
            <div className='image-container fade-in-image'>
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