import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../../layout/MainLayout";

export const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </>
  );
}


const NewRoute = ({ path, routes, layout }: any) =>
  <Routes>
    <Route path={path} element={layout}>{renderRoutes(routes)}</Route>
  </Routes>
  ;

export const renderRoutes = (routes: any[]) => routes.map(({ path, component }: any) => <Route path={path} Component={component} />
);