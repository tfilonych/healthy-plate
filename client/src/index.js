import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './styles/index.scss';
import App from './App';
import store from './store';

const root = document.getElementById('root');
hydrateRoot(
  root,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
