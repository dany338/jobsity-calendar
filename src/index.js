import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CookiesProvider } from "react-cookie";
import App from './App';
import * as serviceWorker from './serviceWorker';
import Provider from './infrastructure/store';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
