import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import axios from "axios";
import { AuthProvider } from './app/app/provider/AuthProvider';

import { Provider } from 'react-redux';
import { store } from './app/app/store';

//axios.defaults.baseURL = 'https://api.academic.nova.app.hiperbite.com/api/v1/'
axios.defaults.baseURL = "http://localhost:7100/api/v1/"

//let locale = navigator.language;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
