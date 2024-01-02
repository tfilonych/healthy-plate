import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';
import Ingredients from '../components/recipeCard/Ingredients';
import Procedures from '../components/recipeCard/Procedures';
import ImageLoad from '../components/recipeCard/ImageLoad';

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const { request } = useHttp();
  // const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: '',
    ingredients: [],
    procedures: '',
    image: ''
  });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (ingredient) => {
    setForm({...form, ingredients: form.ingredients.concat(ingredient)});
  }

  function handleRemove(item) {
    const newList = form.ingredients.filter((ingredient) => ingredient !== item);

    setForm({...form, ingredients: newList});
  }
  const saveRecipe = async () => {
    try {
      const data = await request('/api/recipe/save', 'POST', { ...form },{
        Authorization: `Bearer ${token.accessToken}`,
      });
      navigate('/recipes')
      redirect(data.recipe._id);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="recipe-card new">
      {/*<div className="page-title">Add your recipe</div>*/}
      <div className="recipe-info">
        <ImageLoad setForm={setForm} form={form} />
        <div className="recipe-title">
          <div className="title">Recipe title:</div>
          <input
            placeholder="Add Title"
            name="title"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="desc-container">
        <Ingredients
          name="ingredients"
          changeHandler={changeHandler}
          handleAdd={handleAdd}
          ingredients={form.ingredients}
          handleRemove={handleRemove}
        />
        <Procedures
          name="procedures"
          changeHandler={changeHandler}
        />
      </div>
      <div className="recipe-save-btn" onClick={saveRecipe}>Save Recipe</div>
    </div>
  );
};

export default CreateRecipePage;
