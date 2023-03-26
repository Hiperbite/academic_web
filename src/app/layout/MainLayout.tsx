import React from "react";
import ReactDOM from "react-dom/client";


import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header/Header";

import 'bootstrap/dist/js/bootstrap';
import './Main.scss';

export const MainLayout = () => {
    return <>
        <Header />
        <Outlet />
        <Footer />
    </>

}