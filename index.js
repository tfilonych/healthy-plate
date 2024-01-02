import express from "express";
import fs from "fs";
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
import React from "react";
import ReactDOMServer from "react-dom/server";
import path from "path";
import router from './server/routes';
import config from 'config';
import { StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server.js';
import App from 'client/src/App';
import routes from 'client/src/routes';



const app = express();

app.use('/images', express.static('images'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', router);
// app.use('/t', require('./routes/redirect.route'))


// const PORT = process.env.PORT || config.get('port')





const port = 3009;

const bootstrapScripts = [];
const bootstrapCSS = [];
const staticPathRoot = "client/build/static";

import createFetchRequest from './request';
// import config from 'config';
import http from 'http';
let handler = createStaticHandler(routes);

const ReadDirectoryContentToArray = (folderPath, array) => {
    fs.readdir(path.join(__dirname, folderPath), (err, files) => {
        console.log(path.join(__dirname, folderPath))
        if (err) {
            return console.log(`Unable to scan this folder: ${folderPath}`);
        }

        files.forEach((fileName) => {
            if (
                (fileName.startsWith("main.") && fileName.endsWith(".js")) ||
                fileName.endsWith(".css")
            ) {
                array.push(`${folderPath}/${fileName}`);
            }
        });
    });
};

ReadDirectoryContentToArray(`${staticPathRoot}/js`, bootstrapScripts);
ReadDirectoryContentToArray(`${staticPathRoot}/css`, bootstrapCSS);

app.use(
    "/client/build/static",
    express.static(__dirname + "/client/build/static")
);
app.use(
    "/client/public",
    express.static(__dirname + "/client/public")
);
app.use(
    "/",
    express.static(__dirname + "/client/public/images")
);

app.use(
    "/images/",
    express.static(__dirname + "/server/images")
);
app.use('/api', router);

app.get("*", async (req, res) => {
    res.socket.on("error", (error) => console.log("Fatal error occured", error));
    const templateUrl = path.resolve("client/build/index.html");


    fs.readFile(templateUrl, "utf-8", async (err, data) => {
        if (err) {
            return res.status(500).send("Some error happened");
        }
        let { query, dataRoutes } = createStaticHandler(routes);
        let fetchRequest = createFetchRequest(req);
        let context = await query(fetchRequest);
        let router = createStaticRouter(dataRoutes, context);

        let html = ReactDOMServer.renderToString(
            <StaticRouterProvider
                router={router}
                context={context}
            >
                <App />
            </StaticRouterProvider>
        );
        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            )
        );
    });

    // let didError = false;
    // const stream = ReactDOMServer.renderToPipeableStream(
    //     <StaticRouterProvider location={req.url}>
    //         <AppSSR bootStrapCSS={bootstrapCSS} />
    //     </StaticRouterProvider>
    //     ,
    //     {
    //         bootstrapScripts,
    //         onShellReady: () => {
    //             res.statusCode = didError ? 500 : 200;
    //             res.setHeader("Content-type", "text/html");
    //             stream.pipe(res);
    //         },
    //         onError: (error) => {
    //             didError = true;
    //             console.log("Error", error);
    //         },
    //     }
    // );
});
//
//
// app.use("*", (req, res) => {
//     const templateUrl = path.resolve("client/build/index.html");
//     fs.readFile(templateUrl, "utf-8", (err, data) => {
//         if (err) {
//             return res.status(500).send("Some error happened");
//         }
//
//         const html = ReactDOMServer.renderToString(
//             <StaticRouter location={req.originalUrl}>
//                 <App />
//             </StaticRouter>
//         );
//
//         return res.send(
//             data.replace(
//                 '<div id="root"></div>',
//                 `<div id="root">${html}</div>`
//             )
//         );
//     });
// });

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        if (mongoose.connection.readyState !== 1) {
            // Mongoose is not connected
            throw new Error('Mongoose is not connected to the database');
        } else {
            console.log('MONGOOSE IS CONNECTED TO DATABASE')
        }
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`Server is running on port 2000`)
        })

    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()