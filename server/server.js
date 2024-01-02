import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server.js';
import App from '../client/src/App';

const PORT = process.env.PORT || 3006;
const app = express();

app.get("/*", (req, res) => {
    const entryPoint = ["/index.js"];

    const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>,
        {
            bootstrapScripts: entryPoint,
            onShellReady() {
                res.statusCode = 200;
                res.setHeader("Content-type", "text/html");
                pipe(res);
            },
            onShellError() {
                res.statusCode = 500;
                res.send("<!doctype html><p>Loading...</p>");
            },
        }
    );
});

// app.use(express.static('./build'));
// app.use('/images', express.static('images'))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});