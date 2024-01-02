import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { RecipesPage, recipesLoader } from './pages/RecipesPage';
import CreateRecipePage from './pages/CreateRecipePage';
import { RecipePage, recipeLoader } from './pages/RecipePage';
import AboutPage from './pages/AboutPage';
import Layout from './pages/Layout';
import SignUpPage from './pages/SignUpPage';
// import WebSocketTrain from './WebSocketTrain';

// const useRoutes = () => {
  // console.log(isAuthenticated)
  // if (!isAuthenticated) {
  //     return (
  //         <Switch>
  //             <Route path="/links" exact>
  //                 <LinksPage />
  //             </Route>
  //             <Route path="/create" exact>
  //                 <CreatePage />
  //             </Route>
  //             <Route path="/detail/:id" exact>
  //                 <DetailPage />
  //             </Route>
  //             <Redirect to="/create" />
  //         </Switch>
  //     )
  // }
  //   const router = createBrowserRouter([
  //       {
  //           path: "/",
  //           element: <Layout />,
  //           children: [
  //               {
  //                   path: "/",
  //                   element: <HomePage />,
  //               },
  //               {
  //                   path: "about",
  //                   element: <AboutPage />,
  //               },
  //               {
  //                   path: "login",
  //                   element: <LoginPage />,
  //               },
  //           ],
  //       },
  //   ]);

    // return (
    //     <Route path="/" element={<Layout />} >
    //                 <Route index element={<HomePage />} />
    //                  <Route path="about" element={<AboutPage />} />
    //                  <Route path="login" element={<LoginPage />}  />
    //                  <Route path="sign-up" element={<SignUpPage />} />
    //                  <Route path="recipes" loader={recipesLoader} element={<RecipesPage />} />
    //                  <Route path="recipes/:id" loader={recipeLoader} element={<RecipePage />} />
    //                  <Route path="create-recipe" element={<CreateRecipePage />} />
    //                  <Route
    //                      path="*"
    //                      element={<Navigate to="/" replace />}
    //                  />
    //              </Route>
    // )


    const routes = [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: "/about",
                    element: <AboutPage />,
                },
                {
                    path: "/recipes",
                    loader: recipesLoader,
                    element: <RecipesPage />,
                }
            ]
        }
    ];

    // const router = createBrowserRouter(createRoutesFromElements(
    //     <Route path="/" element={<Layout />} >
    //         <Route index element={<HomePage />} />
    //         <Route path="about" element={<AboutPage />} />
    //         <Route path="login" element={<LoginPage />}  />
    //         <Route path="sign-up" element={<SignUpPage />} />
    //         <Route path="recipes" loader={recipesLoader} element={<RecipesPage />} />
    //         <Route path="recipes/:id" loader={recipeLoader} element={<RecipePage />} />
    //         <Route path="create-recipe" element={<CreateRecipePage />} />
    //         <Route
    //             path="*"
    //             element={<Navigate to="/" replace />}
    //         />
    //     </Route>
    // ));

    // return routes;
// };

export default routes;
