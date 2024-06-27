import React from 'react';
import Info from './Info';
import Ingredients from './Ingredients';
import Procedures from './Procedures';
import CardImage from './CardImage';

const RecipeLayout = () => {
  return (
    <article className='recipe-card'>
      <Info />
      <CardImage />
      <div className='desc-container'>
        <Ingredients />
        <Procedures />
      </div>
    </article>
  );
};

export default RecipeLayout;
