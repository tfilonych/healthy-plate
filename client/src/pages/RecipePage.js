import React, { Suspense } from 'react';
import { defer, useLoaderData, Await } from 'react-router-dom';

const RecipePage = () => {
  const { recipe } = useLoaderData();
  return (
    <Suspense fallback="<h1>Loading...</h1>>">
      <Await resolve={recipe}>
        {(resolvedRecipe) => {
          return (
            <div className="recipe-card new">
              <div className="recipe-info">
                <div className="image-container">
                  {resolvedRecipe.image && <img src={resolvedRecipe.image} />}
                </div>
                <div className="recipe-title">{resolvedRecipe.title}</div>
              </div>
              <div className="desc-container">
                <div className="ingredients">
                  <div className="ingredients-title">Ingredients:</div>
                  {resolvedRecipe.ingredients && <div className="ingredient-list">
                    {resolvedRecipe.ingredients.map((item, i) => (
                      <div className="ingredient tick" key={i}>
                        <div>{item}</div>
                      </div>
                    ))}
                  </div>}
                </div>
                <div className="procedures">
                  <div className="title">Procedures:</div>
                  <div className="item">
                    {resolvedRecipe.procedures}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Await>
    </Suspense>
  );
};

const getRecipe = async(id) => {
  try {
    const response = await fetch(`/api/recipe/${id}`);
    return await response.json();
  } catch (e) {
    return e.message;
  }
}

const recipeLoader = async ({ params }) => {
  return defer({
    recipe: getRecipe(params.id)
  })
}

export { RecipePage, recipeLoader };
