import React from 'react';
import {createBrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes} from 'react-router-dom';
import routes from './routes';
// import AuthContext from './context/AuthContext';
// import useAuth from './hooks/auth.hook';
// import useToken from './hooks/token.hook';
// import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HeaderWrapper from './components/header/HeaderWrapper';
import TopPanel from './components/header/TopPanel';
import Logo from './components/header/Logo';
import Navbar from './components/header/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {recipesLoader, RecipesPage} from './pages/RecipesPage';
import {recipeLoader, RecipePage} from './pages/RecipePage';
import CreateRecipePage from './pages/CreateRecipePage';
import Layout from './pages/Layout';

const App = () => {
  // const { login, logout, isAuthenticated } = useAuth();
  // const { token } = useToken();
  // console.log('isAuthenticated ', isAuthenticated);
  // const routes = useRoutes();
  //   let router = createBrowserRouter(routes);


  // return (
  //     <Layout>
  //         <RouterProvider router={routes} />
  //     </Layout>
  // )

  return (
      <>
          <Layout/>
      </>)
    // <AuthContext.Provider
    //   value={{
    //     // token,
    //     // login,
    //     // logout,
    //     // isAuthenticated,
    //   }}
    // >
        {/*<RouterProvider router={routes} />*/}
    // </AuthContext.Provider>
  // );
}

export default App;
