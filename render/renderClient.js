import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import AppSSR from 'client/src/AppSSR';
import { bootstrapCSS, bootstrapScripts } from '../bootstrappedFiles';

const renderClient = (req, res) => {
  let didError = false;
  const stream = renderToPipeableStream(
    <StaticRouter location={req.url} context={req.params}>
      <AppSSR bootStrapCSS={bootstrapCSS} />
    </StaticRouter>,
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