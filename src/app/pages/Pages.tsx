import React from "react";

import { Outlet, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { AuthLayout } from "../layout/AuthLayout";
import { authRoutes } from "./Auth/Auth";
import { NotFound } from "./Common/NotFound";
import { mainRoutes } from "./Main/Main.Routes";
import { Page } from "../layout/Page";
import { RequireAuth } from "../app/api/auth/RequireAuth";

export const Pages = () => {
  return (
    <>
      <NewRoute path="/auth/*" routes={authRoutes} layout={<AuthLayout />} />
      <NewRoute path="/*" routes={mainRoutes} requireAuth={true} layout={<MainLayout />} />
    </>
  );
}


const NewRoute = ({ path, routes, layout, requireAuth = false }: any) => {

  return <Routes>
    <Route path={path} element={layout}>{renderRoutes(routes)}</Route>
  </Routes>

    ;
}


export const renderRoutes = (routes: any[]) => routes.map(({ path, component = <><Outlet /></>, childs }: any, index) => {

  if (childs)

    return <Route path={path} element={component} >
      {renderRoutes(childs)}
    </Route>
  else
    return <Route path={path} Component={component} key={index} />

}
);