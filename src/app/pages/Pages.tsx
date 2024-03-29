import React from "react";

import { Outlet, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { AuthLayout } from "../layout/AuthLayout";
import { authRoutes } from "./Auth/Auth";
import { NotFound } from "./Common/NotFound";
import { mainRoutes } from "./Main/Main.Routes";
import { RequireAuth } from "../app/api/auth/RequireAuth";
import { AuthFilter } from "../app/api/auth/AuthFilter";

export const Pages = () => {
  return (
    <>
      <NewRoute path="/auth/*" routes={authRoutes} requireAuth={false} layout={<AuthLayout />} />
      <NewRoute path="/" routes={mainRoutes} requireAuth={true} layout={<MainLayout />} />
    </>
  );
}


const NewRoute = ({ path, routes, layout, requireAuth = false }: any) => <Routes>
  <Route path="" element={<RequireAuth />}>
    <Route path={path} element={layout}>{renderRoutes(routes)}</Route>
  </Route>
</Routes>
  ;



export const renderRoutes = (routes: any[]) => routes.map(({ path, roles, component = <><Outlet /></>, childs }: any, index) =>
  (childs)
    ? <Route path={path} element={component} >
      {renderRoutes(childs)}
    </Route>
    : <Route path="" element={<AuthFilter roles={roles} />}>
      <Route path={path} Component={component} key={index} />
    </Route>
);