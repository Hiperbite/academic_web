import { Outlet } from "react-router-dom";
import { Default, Page } from "../../layout/Page";
import { NotFound } from "../Common/NotFound";
import { Dashboard } from "./Dashboard/Dashboard";
import { Home } from "./Home/Home";
import { DetailsClasse } from "./pedagogical/Classe/DetailClasse/DetailsClasse";
import { ListClasse } from "./pedagogical/Classe/ListClasse";
import { NewClasse } from "./pedagogical/Classe/NewClasse";
import { UpdateClasse } from "./pedagogical/Classe/UpdateClasse";
import { DetailsClassRoom } from "./pedagogical/ClassRoom/DetailClassRoom/DetailClassRoom";
import { ListClassRoom } from "./pedagogical/ClassRoom/ListClassRoom";
import { NewClassRoom } from "./pedagogical/ClassRoom/NewClassRoom";
import { UpdateClassRoom } from "./pedagogical/ClassRoom/UpdateClassRoom";
import { Course } from "./pedagogical/Course/Course";
import { DetailCourse } from "./pedagogical/Course/DetailCourse/DetailCourse";
import { NewCourse } from "./pedagogical/Course/NewCourse";
import { UpdateCourse } from "./pedagogical/Course/UpdateCourse";
import { DetailDiscipline } from "./pedagogical/Discipline/DetailDiscipline/DetailDiscipline";
import { Discipline } from "./pedagogical/Discipline/Discipline";
import { NewDiscipline } from "./pedagogical/Discipline/NewDiscipline";
import { UpdateDiscipline } from "./pedagogical/Discipline/UpdateDiscipline";
import { DetailsPeriod } from "./pedagogical/Period/DetailPeriod/DetailPeriod";
import { ListPeriod } from "./pedagogical/Period/ListPeriod";
import { UpdatePeriod } from "./pedagogical/Period/NewPeriod";
import { Staff } from "./Staff/Staff";
import { DetailsStaff } from "./Staff/Staff/DetailsStaff";
import { ListStaff } from "./Staff/Staff/ListStaffs";
import { RegisterNewStaff } from "./Staff/Staff/RegisteStaff/RegisteNewStaff";
import { UpdateExistedStaff } from "./Staff/Staff/UpdateStaff/UpdateExistedStaff";
import { ListCandidates } from "./Students/Candidates/ListCandidates";
import { AllStudents } from "./Students/Random/AllStudents";
import { Students } from "./Students/Students";
import { DetailsStudents } from "./Students/Students/DetailsStudents";
import { ListStudents } from "./Students/Students/ListStudents";
import { RegisterNewStudent } from "./Students/Students/RegisteStudent/RegisteNewStudent";
import { UpdateExistedStudent } from "./Students/Students/UpdateStudent/UpdateExistedStudent";
import { Activities } from "./User/Activities";
import { Contacts } from "./User/Contacts";
import { HomeUserProfile } from "./User/HomeUserProfile";
import { Settings } from "./User/Settings";

const EmptyComponet = () => <>9898<hr /><Outlet /></>
export const mainRoutes = [
  { path: "", component: Dashboard },
  { path: "home", component: Dashboard },
  {
    path: "me/*", component: <Default type={"students"} />, childs: [

      { path: "profile", component: HomeUserProfile },
      { path: "contacts", component: Contacts },
      { path: "activities", component: Activities },
      { path: "settings", component: Settings },
    ]
  },
  {
    path: "students/*", component: <Page type={"students"} />, childs: [

      { path: "", component: Students },
      { path: "list", component: ListStudents },
      { path: "new/*", component: RegisterNewStudent },
      { path: "show/:id", component: DetailsStudents },
      { path: "update/:id/*", component: UpdateExistedStudent },
      { path: "candidates", component: ListCandidates },
      { path: "all", component: AllStudents },
    ]
  },
  {
    path: "staffs/*", component: <Page type={"staffs"} />, childs: [

      { path: "", component: Staff },
      { path: "list", component: ListStaff },
      { path: "new/*", component: RegisterNewStaff },
      { path: "show/:id", component: DetailsStaff },
      { path: "update/:id/*", component: UpdateExistedStaff },
    ]
  },
  {
    path: "pedagogical/*", component: <Page type={"pedagogical"} />, childs: [

      {
        path: "classe/*", childs: [

          { path: "", component: ListClasse },
          { path: "list", component: ListClasse },
          { path: "new/*", component: NewClasse },
          { path: "show/:id", component: DetailsClasse },
          { path: "update/:id/*", component: UpdateClasse },
        ]
      },
      {
        path: "class-rooms/*", childs: [

          { path: "", component: ListClassRoom },
          { path: "list", component: ListClassRoom },
          { path: "new/*", component: NewClassRoom },
          { path: "show/:id", component: DetailsClassRoom },
          { path: "update/:id/*", component: UpdateClassRoom },
        ]
      },
      {
        path: "periods", component: EmptyComponet, childs: [

          { path: "", component: ListPeriod },
          { path: "list", component: ListPeriod },
          { path: "new/*", component: UpdatePeriod },
          { path: "show/:id", component: DetailsPeriod },
          { path: "update/:id/*", component: UpdatePeriod },
        ]
      },
      {
        path: "disciplines", component: EmptyComponet, childs: [

          { path: "", component: Discipline },
          { path: "list", component: Discipline },
          { path: "new/*", component: NewDiscipline },
          { path: "show/:id", component: DetailDiscipline },
          { path: "update/:id/*", component: UpdateDiscipline },
        ]
      },
      {
        path: "courses", component: EmptyComponet, childs: [

          { path: "", component: Course },
          { path: "list", component: Course },
          { path: "new/*", component: NewCourse },
          { path: "show/:id", component: DetailCourse },
          { path: "update/:id/*", component: UpdateCourse },
        ]
      },

    ]
  },
      { path: "*", component: NotFound },

];


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
        <Route path="*" element={<NotFound />} />
      </Routes>

      */