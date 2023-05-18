import React from "react";

import { Outlet } from "react-router-dom";
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