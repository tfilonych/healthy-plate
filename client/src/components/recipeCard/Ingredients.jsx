import React from 'react';

const Ingredients = ({ ingredients = [] }) => (
  <div className='ingredients'>
    <div className='ingredients-title'>Ingredients:</div>
    <div className='ingredient-list'>
      {ingredients.length > 0 && ingredients.map(item => (
        <div className='ingredient tick' key={item}>
          <div>{item}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Ingredients;