import React, { createContext, useState } from 'react';

import "./App.scss";
import './App.css';

import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Spinner } from './app/pages/Components/Snipper/Spinner';
import { Pages } from './app/pages/Pages';


export const LoadingContext:any = createContext('');

function App() {

const [loading, setLoading] = useState(false)

  return (
    <><Spinner loading={loading}/>
    <LoadingContext.Provider value={{loading, setLoading}}>
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
      </LoadingContext.Provider>
    </>
  );
}

export default App;
