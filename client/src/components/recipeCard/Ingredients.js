import React, { useState } from 'react';

const Ingredients = ({
  handleRemove,
  ingredients=[],
  handleAdd
}) => {
  const [ingredient, setIngredient] = useState('');

  const changeHandler = (e) => {
    setIngredient(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key && (e.key === 'Enter')) {
      addToArray();
    }
  }

  const addToArray = () => {
    handleAdd(ingredient);
    setIngredient('');
  }

  return (
    <div className="ingredients">
      <div className="ingredients-title">Ingredients:</div>
        <div className="item">
          <div className="ingredient-input">
            <input
              className=""
              placeholder="Add ingredient"
              id="ingredient"
              type="text"
              name="ingredient"
              value={ingredient}
              onChange={changeHandler}
              onKeyPress={onKeyPress}
            />
          </div>
          <div className="add-new-btn" onClick={addToArray}>Add</div>
        </div>
      {ingredients.length > 0 && <div className="ingredient-list">
        {ingredients.map((item, i) => (
          <div className="ingredient" key={i}>
            <div className="minus" onClick={() => handleRemove(item)} />
            <div>{item}</div>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default Ingredients;