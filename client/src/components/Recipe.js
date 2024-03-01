import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../utils/fetchHandler';
import { transformDate } from '../utils/utils';
import Divider from './ui/Divider';
import Ingredients from './recipeCard/Ingredients';
import Info from './recipeCard/Info';
import Procedures from './recipeCard/Procedures';
import CardImage from './recipeCard/CardImage';

let resource;

const Recipe = () => {
  const { id } = useParams();
  if (!resource) {
    resource = fetchData(`/api/recipe/${id}`);
  }
  const recipe = resource.read().data;

  useEffect(() => {
    return () => {
      resource = null;
    };
  }, []);

  return (
    <article className='recipe-card'>
      <div className='horizontal-container'>
        <Info className={'align-center'}>
          <h2 className='recipe-title'>{recipe.title}</h2>
          <div className='author'>By Username</div>
          <div className='time-added'>{transformDate(recipe.date)}</div>
          <div className='time-cooking'>Total Time: 1 hour 15minutes</div>
          <div className='rating'>
            <img src='/../public/images/stars/icons8-star-48.png' />
            <img src='/../public/images/stars/icons8-star-48.png' />
            <img src='/../public/images/stars/icons8-star-48.png' />
            <img src='/../public/images/stars/icons8-star-48.png' />
            <img src='/../public/images/stars/icons8-star-48.png' />
          </div>
        </Info>
        <CardImage>{recipe.image && <img src={recipe.image} />}</CardImage>
      </div>

      <Divider />
      <Ingredients ingredients={recipe.ingredients} />
      <Divider />
      <Procedures>
        {recipe.procedures}
      </Procedures>
    </article>
  );
};

export default Recipe;