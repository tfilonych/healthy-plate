import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";

const useRoutes = (isAuthenticated) => {
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

  return (
    <Switch>
      <Route path="/recipes">
        <RecipesPage />
      </Route>
      <Route path="/login">
        <AuthPage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
