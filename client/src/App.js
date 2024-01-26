import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import RecipesPage from './pages/RecipesPage';
import RecipePage from './pages/RecipePage';
import CreateRecipePage from './pages/CreateRecipePage';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import AuthContextProvider from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/recipes' element={<RecipesPage />} />
          <Route path='/recipes/:id' element={<RecipePage />} />
          <Route path='/create-recipe' element={<CreateRecipePage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
