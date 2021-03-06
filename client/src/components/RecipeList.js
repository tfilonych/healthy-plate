import React from 'react';
import defaultImage from '../images/default-image.jpg';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes=[] }) => {
  return (
    <>
      {recipes.map((recipe, index) => {
          return (
            <div className="recipe" key={index}>
              <div className="image-container">
                <img src={recipe.image ? recipe.image : defaultImage} data-src={defaultImage} />
              </div>
              <div className="txt-container">
                <div className="title">{recipe.title}</div>
                <div className="description">{recipe.procedures}</div>
                <Link to={`/recipes/${recipe._id}`} className="more-btn">More</Link>
              </div>
            </div>
          );
        })}
    </>
  )
}

export default RecipeList;