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
import { Default, Page } from './app/layout/Page';
import { Students } from './app/pages/Students/Students';
import { ListStudents } from './app/pages/Students/Students/ListStudents';
import { DetailsStudents } from './app/pages/Students/Students/DetailsStudents';
import { RegisterNewStudent } from './app/pages/Students/Students/RegisteStudent/RegisteNewStudent';
import { ToastContainer } from 'react-toastify';

import { ListClassRoom } from './app/pages/pedagogical/ClassRoom/ListClassRoom';
import { NewClassRoom } from './app/pages/pedagogical/ClassRoom/NewClassRoom';
import { DetailsClassRoom } from './app/pages/pedagogical/ClassRoom/DetailClassRoom/DetailClassRoom';
import { UpdateClassRoom } from './app/pages/pedagogical/ClassRoom/UpdateClassRoom';
import { ListPeriod } from './app/pages/pedagogical/Period/ListPeriod';
import { DetailsPeriod } from './app/pages/pedagogical/Period/DetailPeriod/DetailPeriod';
import { UpdatePeriod } from './app/pages/pedagogical/Period/UpdatePeriod';
import { RequireAuth } from './app/app/api/auth/RequireAuth';
import { ListCandidates } from './app/pages/Students/Candidates/ListCandidates';
import { AllStudents } from './app/pages/Students/Random/AllStudents';
import { UpdateExistedStudent } from './app/pages/Students/Students/UpdateStudent/UpdateExistedStudent';
import { Discipline } from './app/pages/pedagogical/Discipline/Discipline';
import { NewDiscipline } from './app/pages/pedagogical/Discipline/NewDiscipline';
import { DetailDiscipline } from './app/pages/pedagogical/Discipline/DetailDiscipline/DetailDiscipline';
import { UpdateDiscipline } from './app/pages/pedagogical/Discipline/UpdateDiscipline';
import { Course } from './app/pages/pedagogical/Course/Course';
import { NewCourse } from './app/pages/pedagogical/Course/NewCourse';
import { UpdateCourse } from './app/pages/pedagogical/Course/UpdateCourse';
import { DetailCourse } from './app/pages/pedagogical/Course/DetailCourse/DetailCourse';
import { Staff } from './app/pages/Staff/Staff';
import { ListStaff } from './app/pages/Staff/Staff/ListStaffs';
import { RegisterNewStaff } from './app/pages/Staff/Staff/RegisteStaff/RegisteNewStaff';
import { DetailsStaff } from './app/pages/Staff/Staff/DetailsStaff';
import { UserProfile } from './app/pages/User/UserProfile';
import { Activities } from './app/pages/User/Activities';
import { Settings } from './app/pages/User/Settings';
import { HomeUserProfile } from './app/pages/User/HomeUserProfile';
import { Contacts } from './app/pages/User/Contacts';
import { ListClasse } from './app/pages/pedagogical/Classe/ListClasse';
import { NewClasse } from './app/pages/pedagogical/Classe/NewClasse';
import { UpdateClasse } from './app/pages/pedagogical/Classe/UpdateClasse';
import { DetailsClasse } from './app/pages/pedagogical/Classe/DetailClasse/DetailsClasse';



function App() {
  return (
    <>
      <BrowserRouter>
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
                <Route path="update/:id/*" element={<UpdateExistedStudent />} />

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
                <Route path="new" element={<NewClassRoom />} />
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
