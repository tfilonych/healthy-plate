import React from 'react';

const Ingredients = ({ ingredients, children }) => {
  // const [ingredient, setIngredient] = useState('');

  // const changeHandler = (e) => {
  //   setIngredient(e.target.value);
  // };
  //
  // const onKeyPress = (e) => {
  //   if (e.key && (e.key === 'Enter')) {
  //     addToArray();
  //   }
  // }
  //
  // const addToArray = () => {
  //   handleAdd(ingredient);
  //   setIngredient('');
  // }

  return (
    <div className='ingredients'>
      <div className='ingredients-title'>Ingredients:</div>
      {children}
      {ingredients && <div className='ingredient-list'>
        {ingredients.map((item, i) => (
          <div className='ingredient tick' key={i}>
            <div>{item}</div>
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Ingredients;