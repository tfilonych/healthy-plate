import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ingredients from '../components/recipeCard/Ingredients';
import Procedures from '../components/recipeCard/Procedures';
import ImageLoad from '../components/recipeCard/ImageLoad';
import $api from '../http';
import TextArea from '../components/ui/TextArea';
import Input from '../components/ui/Input';
import Info from '../components/recipeCard/Info';
import CardImage from '../components/recipeCard/CardImage';

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    ingredients: [],
    procedures: '',
    image: '',
    file: ''
  });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (ingredient) => {
    setForm({ ...form, ingredients: form.ingredients.concat(ingredient) });
  };

  function handleRemove(item) {
    const newList = form.ingredients.filter((ingredient) => ingredient !== item);

    setForm({ ...form, ingredients: newList });
  }

  const saveRecipe = async () => {
    try {
      const response = await $api.post('/api/recipe/save', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate(`/recipes/${response.data.recipe._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='recipe-card new'>
      <div className='horizontal-container'>
        <Info>
          <div className='recipe-title'>
            <div className='title'>Recipe title:</div>
            <input
              placeholder='Add Title'
              name='title'
              onChange={changeHandler}
            />
          </div>
        </Info>
        <CardImage>
          <ImageLoad setForm={setForm} form={form} />
        </CardImage>
      </div>
      <Ingredients
        name='ingredients'
        changeHandler={changeHandler}
        handleAdd={handleAdd}
        ingredients={form.ingredients}
        handleRemove={handleRemove}
      >
        <div className='item'>
          <div className='ingredient-input'>
            <Input
              placeholder='Add ingredient'
              id='ingredients'
              type='text'
              name='ingredients'
              value={form.ingredients}
              // onKeyPress={onKeyPress}
            />
          </div>
          <div className='add-new-btn' onClick={handleAdd}>Add</div>
        </div>

        {/*{form.ingredients.length > 0 && <div className='ingredient-list'>*/}
        {/*  {form.ingredients.map((item, i) => (*/}
        {/*    <div className='ingredient' key={i}>*/}
        {/*      <div className='minus' onClick={() => handleRemove(item)} />*/}
        {/*      <div>{item}</div>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>}*/}
      </Ingredients>
      <Procedures
      >
        <TextArea
          placeholder='Add Procedure'
          value={form.procedures}
          name='procedures'
          changeHandler={changeHandler}
        />
      </Procedures>
      <div className='recipe-save-btn' onClick={saveRecipe}>Save Recipe</div>
    </div>
  );
};

export default CreateRecipePage;
