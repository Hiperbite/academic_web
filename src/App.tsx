import React from 'react';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Main } from './app/layout/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from './app/pages/Dashboard/Dashboard';
import { Home } from './app/pages/Home/Home';
import { AuthLayout } from './app/layout/AuthLayout';
import { SingIn } from './app/pages/Auth/SingIn';
import { SingOn } from './app/pages/Auth/SingOn';
import { NotFound } from './app/pages/Common/NotFound';
import { Page } from './app/layout/Page';
import { Students } from './app/pages/Students/Students';
import { ListStudents } from './app/pages/Students/Students/ListStudents';
import { DetailsStudents } from './app/pages/Students/Students/DetailsStudents';
import { NewStudent } from './app/pages/Students/Students/NewStudent';
import { ListClassy } from './app/pages/pedagogical/ListClassy';
import { NewClassy } from './app/pages/pedagogical/NewClassy';
import { ToastContainer } from 'react-toastify';
import { DetailsClassy } from './app/pages/pedagogical/DetailClassy/DetailsClassy';
import { UpdateClassy } from './app/pages/pedagogical/UpdateClassy';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Dashboard />} />
            <Route path="Home" element={<Home />} />

            <Route path="/students" element={<Page type={"students"} />}>
              <Route index element={<Students />} />
              <Route path="list" element={<ListStudents />} />
              <Route path="new/*" element={<NewStudent />} />
              <Route path="show/:id" element={<DetailsStudents />} />
            </Route>

            <Route path="/pedagogical" element={<Page type={"pedagogical"} />}>
              <Route index element={<Students />} />
              <Route path="classy" element={<ListClassy />} />
              <Route path="classy/new" element={<NewClassy />} />
              <Route path="classy/update/:id" element={<UpdateClassy/>} />
              <Route path="classy/:id" element={<DetailsClassy/>} />
              <Route path="new/*" element={<NewStudent />} />
              <Route path="show/:id" element={<DetailsStudents />} />
            </Route>
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<SingIn />} />
            <Route path="singin" element={<SingIn />} />
            <Route path="singon" element={<SingOn />} />

          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
