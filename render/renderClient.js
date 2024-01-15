import React from 'react';
import {renderToPipeableStream} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server';
import AppSSR from 'client/src/AppSSR';
import store from 'client/src/store';
import {bootstrapCSS, bootstrapScripts} from '../bootstrappedFiles';
import {Provider} from 'react-redux';
import {fetchRecipes} from 'client/src/store/recipeSlice';

const renderClient = async (req, res) => {
  let didError = false;
  await store.dispatch(fetchRecipes());
  const preloadedState = store.getState();

  const stream = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={req.params}>
        <AppSSR bootStrapCSS={bootstrapCSS} preloadedState={preloadedState}/>
      </StaticRouter>
    </Provider>
    ,
    {
      bootstrapScripts,
      onShellReady: () => {
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      onError: (error) => {
        didError = true;
        console.log("Error", error);
      },
    }
  );
};

export default renderClient;