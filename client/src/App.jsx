import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import RecipesPage from './pages/RecipesPage';
import RecipePage from './pages/RecipePage';
import CreateRecipePage from './pages/CreateRecipePage';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import AuthContextProvider from './context/AuthContext';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
// import PrivateRoute from './pages/PrivateRoute';

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
          <Route path='/recipes/new' element={<CreateRecipePage />} />
          {/*<Route path='/recipes/new' element={*/}
          {/*  <PrivateRoute>*/}
          {/*    <CreateRecipePage />*/}
          {/*  </PrivateRoute>*/}
          {/*} />*/}
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
