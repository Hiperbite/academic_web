import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import axios from "axios";

axios.defaults.baseURL = "http://localhost:7100/api/v1/";  /*'https://4000-omkurir-server-ul2zrczd9mb.ws-eu54.gitpod.io/api/v2'*///process.env.REACT_APP_BASE_URL_API;

axios.defaults.headers.common["apikey"] = process.env.REACT_APP_BASE_API_KEY??'';
//let locale = navigator.language;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
