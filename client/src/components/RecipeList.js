import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../images/default-image.jpg';
import fetchData from '../utils/fetchHandler';

let resource;

const RecipeList = () => {
  if (!resource) {
    resource = fetchData('/api/recipe/all');
  }
  const recipes = resource.read();

  useEffect(() => {
    return () => {
      resource = null
    }
  }, []);

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  }

  return (
    <>
      {recipes.map(recipe => {
        return (
          <Link className="recipe flip-container" key={recipe._id} to={`/recipes/${recipe._id}`}>
            <div className="txt-container">
              <div className="title">{recipe.title}</div>
              &#9918;
              <div className="cook-item">15m</div>
            </div>
            <div className="image-container">
              <img
                src={recipe.image ? recipe.image : defaultImage}
                onError={handleImageError}
                alt={recipe.title}
                loading="lazy"
              />
            </div>
          </Link>
        );
        })}
    </>
  )
}

export default RecipeList;