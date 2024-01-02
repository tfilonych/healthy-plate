import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
import './styles/index.scss';
import App from './App';
import ReactDOM from 'react-dom';
import routes from './routes';

let router = createBrowserRouter(routes);

hydrateRoot(
    document.getElementById("root"),
    <RouterProvider router={router}>
        <App/>
    </RouterProvider>
);


// ReactDOM.hydrate(
//     <React.StrictMode>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </React.StrictMode>,
//     document.getElementById("root")
// );
//
// const root = document.getElementById('root');
// hydrateRoot(
//     root,
//     <React.StrictMode>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </React.StrictMode>
// );

