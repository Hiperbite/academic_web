import React from "react";
import "./App.scss";
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authRoutes } from "./Auth/Auth";
import { AuthLayout } from "../layout/AuthLayout";
import { MainLayout } from "../layout/MainLayout";

export const Index=() =>{
    return (
      <>
        <BrowserRouter>
          <NewRoute path="/auth" routes={authRoutes} layout={<AuthLayout />}/>
          <Routes>
            <Route path="/" element={<MainLayout />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  
  const NewRoute = ({ path, routes , layout}: any) => 
    <Routes>
      <Route path={path} element={<>Ola</>}/>
    </Routes>
  ;
  
  export const renderRoutes = (routes:any[])=>routes.map(({ path, component }: any) => (
    <Route path={path} element={component} />
  ));