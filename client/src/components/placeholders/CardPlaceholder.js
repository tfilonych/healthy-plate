import React from 'react';

const CardPlaceholder = () => (
  <div className="recipe-card placeholder">
    <div className="recipe-info">
      <div className="image-container loads" />
      <div className="recipe-title loads" />
    </div>
    <div className="desc-container">
      <div className="ingredients">
        <div className="ingredients-title loads" />
        <div className="ingredients-list loads" />
      </div>
      <div className="procedures">
        <div className="title loads"/>
        <div className="item loads" />
      </div>
    </div>
  </div>
);

export default CardPlaceholder;
