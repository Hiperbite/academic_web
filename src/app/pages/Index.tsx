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

  /*
  const Routs = ()=>
  <Routes>
          <Route path="/" element={<RequireAuth />}>
            <Route path="/" element={<Main />}>
              <Route index element={<Dashboard />} />
              <Route path="Home" element={<Dashboard />} />

              <Route path="/me" element={<Default type={"students"} />}>
                <Route index element={<HomeUserProfile />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="activities" element={<Activities />} />
                <Route path="settings" element={<Settings />} />

                <Route path="candidates" element={<ListCandidates />} />
                <Route path="all" element={<AllStudents />} />
              </Route>

              <Route path="/students" element={<Page type={"students"} />}>
                <Route index element={<Students />} />
                <Route path="list" element={<ListStudents />} />
                <Route path="new/*" element={<RegisterNewStudent />} />
                <Route path="show/:id" element={<DetailsStudents />} />
                <Route path="update/:id/*" element={<UpdateExistedStudent />} />

                <Route path="candidates" element={<ListCandidates />} />
                <Route path="all" element={<AllStudents />} />
              </Route>
              <Route path="/staffs" element={<Page type={"staffs"} />}>
                <Route index element={<Staff />} />
                <Route path="list" element={<ListStaff />} />
                <Route path="new/*" element={<RegisterNewStaff />} />
                <Route path="show/:id" element={<DetailsStaff />} />
                <Route path="update/:id/*" element={<UpdateExistedStaff/>} />

                <Route path="candidates" element={<ListCandidates />} />
                <Route path="all" element={<AllStudents />} />
              </Route>

              <Route path="/pedagogical" element={<Page type={"pedagogical"} />}>
                <Route index element={<ListClasse />} />
              </Route>
              <Route path="/pedagogical/classe" element={<Page type={"pedagogical"} />}>
                <Route index element={<ListClasse />} />
                <Route path="list" element={<ListClasse />} />
                <Route path="new" element={<NewClasse />} />
                <Route path="update/:id" element={<UpdateClasse />} />
                <Route path=":id" element={<DetailsClasse />} />
              </Route>

              <Route path="/pedagogical/class-rooms" element={<Page type={"pedagogical"} />}>
                <Route index element={<ListClassRoom />} />
                <Route path="list" element={<ListClassRoom />} />
                <Route path="new" element={<NewClassRoom />} />
                <Route path="update/:id" element={<UpdateClassRoom />} />
                <Route path=":id" element={<DetailsClassRoom />} />
              </Route>

              <Route path="/pedagogical/periods" element={<Page type={"pedagogical"} />}>
                <Route index element={<ListPeriod />} />
                <Route path="list" element={<ListPeriod />} />
                <Route path="new" element={<UpdatePeriod />} />
                <Route path="update/:id" element={<UpdatePeriod />} />
                <Route path=":id" element={<DetailsPeriod />} />
              </Route>

              <Route path="/pedagogical/disciplines" element={<Page type={"pedagogical"} />}>
                <Route index element={<Discipline />} />
                <Route path="list" element={<Discipline />} />
                <Route path="new" element={<NewDiscipline />} />
                <Route path="update/:id" element={<UpdateDiscipline />} />
                <Route path=":id" element={<DetailDiscipline />} />
              </Route>

              <Route path="/pedagogical/courses" element={<Page type={"pedagogical"} />}>
                <Route index element={<Course />} />
                <Route path="list" element={<Course />} />
                <Route path="new" element={<NewCourse />} />
                <Route path="update/:id" element={<UpdateCourse />} />
                <Route path=":id" element={<DetailCourse />} />
              </Route>
            </Route>
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<SignIn />} />
            <Route path="singin" element={<SignIn />} />
            <Route path="singon" element={<SignOn />} />
            <Route path="password-reset/:code/:kid" element={<PasswordReset />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        */