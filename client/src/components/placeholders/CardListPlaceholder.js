import React from 'react';

const CardListPlaceholder = () => (
  <div className="recipes placeholder">
    {new Array(20).fill('').map((recipe, index) => {
      return (
        <div className="recipe" key={index}>
           <div className="image-container loads" />
          <div className="txt-container">
            <div className="title loads" />
            <div className="description loads" />
            <div className="more-btn loads" />
          </div>
        </div>
      );
    })}
  </div>
);

export default CardListPlaceholder;