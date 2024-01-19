import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ingredients from '../components/recipeCard/Ingredients';
import Procedures from '../components/recipeCard/Procedures';
import ImageLoad from '../components/recipeCard/ImageLoad';
import $api from '../http';

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
      {/*<div className="page-title">Add your recipe</div>*/}
      <div className='recipe-info'>
        <div className='recipe-title'>
          <div className='title'>Recipe title:</div>
          <input
            placeholder='Add Title'
            name='title'
            onChange={changeHandler}
          />
        </div>
        <ImageLoad setForm={setForm} form={form} />
      </div>
      <div className='desc-container'>
        <Ingredients
          name='ingredients'
          changeHandler={changeHandler}
          handleAdd={handleAdd}
          ingredients={form.ingredients}
          handleRemove={handleRemove}
        />
        <Procedures
          name='procedures'
          changeHandler={changeHandler}
        />
      </div>
      <div className='recipe-save-btn' onClick={saveRecipe}>Save Recipe</div>
    </div>
  );
};

export default CreateRecipePage;
