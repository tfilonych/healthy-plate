import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ingredients from '../components/recipeCard/Ingredients';
import Procedures from '../components/recipeCard/Procedures';
import ImageLoad from '../components/recipeCard/ImageLoad';
import $api from '../utils/http';
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

  const addPropsToForm = (ingredient) => {
    //setForm({ ...form, ingredients: form.ingredients.concat(ingredient) });
  };

  function removeHandler(item) {
    const newList = form.ingredients.filter((ingredient) => ingredient !== item);

    setForm({ ...form, ingredients: newList });
  }

  const saveRecipe = async () => {
    try {
      const response = await $api.post('/api/recipes', form, {
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
      <div className='item'>
        <div className='ingredient-input'>
          <Input
            placeholder='Add ingredient'
            id='ingredients'
            type='text'
            name='ingredients'
            value=''
            onKeyPress={addPropsToForm}
          />
        </div>
        <div className='add-new-btn' onClick={addPropsToForm}>Add</div>
        <Ingredients ingredients={form.ingredients} />
      </div>
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
