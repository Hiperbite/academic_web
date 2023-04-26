import React, { createContext, useState } from 'react';

import "./App.scss";
import './App.css';

import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ProgressiveLoadingBar, Spinner } from './app/pages/Components/Snipper/Spinner';
import { Pages } from './app/pages/Pages';
import 'moment/locale/pt';
import storage from './app/app/storage';

export const LoadingContext: any = createContext('');
export const AuthContext: any = createContext('');

function App() {

  const [loading, setLoading] = useState(false)

  const user = storage.get('user');
  return (
    <>
      <ProgressiveLoadingBar loading={loading} />
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <AuthContext.Provider value={{ user }}>
          <BrowserRouter>
            <Pages />
          </BrowserRouter>
          <ToastContainer
            position="top-left"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AuthContext.Provider>
      </LoadingContext.Provider>
    </>
  );
}

export default App;
