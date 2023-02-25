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
import { ListClassy } from './app/pages/pedagogical/Classy/ListClassy';
import { NewClassy } from './app/pages/pedagogical/Classy/NewClassy';
import { ToastContainer } from 'react-toastify';
import { DetailsClassy } from './app/pages/pedagogical/Classy/DetailClassy/DetailsClassy';
import { UpdateClassy } from './app/pages/pedagogical/Classy/UpdateClassy';
import { ListClassRoom } from './app/pages/pedagogical/ClassRoom/ListClassRoom';
import { NewClassRoom } from './app/pages/pedagogical/ClassRoom/NewClassRoom';
import { DetailsClassRoom } from './app/pages/pedagogical/ClassRoom/DetailClassRoom/DetailClassRoom';
import { UpdateClassRoom } from './app/pages/pedagogical/ClassRoom/UpdateClassRoom';
import { ListPeriod } from './app/pages/pedagogical/Period/ListPeriod';
import { DetailsPeriod } from './app/pages/pedagogical/Period/DetailPeriod/DetailPeriod';
import { UpdatePeriod } from './app/pages/pedagogical/Period/UpdatePeriod';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Dashboard />} />
            <Route path="Home" element={<Dashboard />} />

            <Route path="/students" element={<Page type={"students"} />}>
              <Route index element={<Students />} />
              <Route path="list" element={<ListStudents />} />
              <Route path="new/*" element={<NewStudent />} />
              <Route path="show/:id" element={<DetailsStudents />} />
            </Route>

            <Route path="/pedagogical" element={<Page type={"pedagogical"} />}>
              <Route index element={<ListClassy />} />
            </Route>
            <Route path="/pedagogical/classy" element={<Page type={"pedagogical"} />}>
              <Route index element={<ListClassy />} />
              <Route path="list" element={<ListClassy />} />
              <Route path="new" element={<NewClassy />} />
              <Route path="update/:id" element={<UpdateClassy />} />
              <Route path=":id" element={<DetailsClassy />} />
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
              <Route path="list" element={<ListPeriod/>} />
              <Route path="new" element={<NewClassRoom />} />
              <Route path="update/:id" element={<UpdatePeriod/>} />
              <Route path=":id" element={<DetailsPeriod />} />
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
    </>
  );
}

export default App;
