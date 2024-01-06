import React, { Suspense } from 'react';
import Recipe from '../components/Recipe';

const RecipePage = () => {
  return (
    <Suspense fallback="<h1>Loading...</h1>">
      <Recipe />
    </Suspense>
  );
};

export default RecipePage;
