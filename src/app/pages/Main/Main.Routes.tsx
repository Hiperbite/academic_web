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
import { Classification } from "./User/Classification";
import { StudentClasseSchedule } from "./User/components/Schedule/StudentClasseSchedule";
import { UserStudentHistory } from "./User/components/UserStudentHistory/UserStudentHistory";
import { HomeUserProfile } from "./User/components/HomeUserProfile/HomeUserProfile";
import { Settings } from "./User/components/Settings/Settings";
import { UserDashboard } from "./User/components/UserDashboard/UserDashboard";
import { RegisterStudentToClass } from "./Students/Students/RegisteStudent/RegisterStudentToClass";
import { Chat } from "./HelpDesk/Chat/Chat";

export const mainRoutes = [
  { path: "", component: Dashboard },
  { path: "home", component: Dashboard },
  {
    path: "me/*", component: <Default type={"students"} />, childs: [

      { path: "", component: UserDashboard },
      { path: "profile", component: HomeUserProfile },
      { path: "classification", component: Classification },
      { path: "time-tables", component: StudentClasseSchedule },
      { path: "history", component: UserStudentHistory },
      { path: "activities", component: Activities },
      { path: "settings", component: Settings },
    ]
  },
  {
    path: "students/*", component: <Page type={"students"} />, childs: [

      { path: "", component: Students },
      { path: "list", component: ListStudents },
      { path: "new/*", component: RegisterNewStudent },
      { path: "register", component: RegisterStudentToClass },
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
          { path: "update/:id/*", component: UpdateClasse },
          { path: ":id", component: DetailsClasse },
        ]
      },
      {
        path: "class-rooms/*", childs: [

          { path: "", component: ListClassRoom },
          { path: "list", component: ListClassRoom },
          { path: "new/*", component: NewClassRoom },
          { path: "update/:id/*", component: UpdateClassRoom },
          { path: ":id", component: DetailsClassRoom },
        ]
      },
      {
        path: "periods/*", childs: [

          { path: "", component: ListPeriod },
          { path: "list", component: ListPeriod },
          { path: "new/*", component: UpdatePeriod },
          { path: "update/:id/*", component: UpdatePeriod },
          { path: ":id", component: DetailsPeriod },
        ]
      },
      {
        path: "disciplines/*", childs: [

          { path: "", component: Discipline },
          { path: "list", component: Discipline },
          { path: "new/*", component: NewDiscipline },
          { path: "update/:id/*", component: UpdateDiscipline },
          { path: ":id", component: DetailDiscipline },
        ]
      },
      {
        path: "courses/*", childs: [

          { path: "", component: Course },
          { path: "list", component: Course },
          { path: "new/*", component: NewCourse },
          { path: "update/:id/*", component: UpdateCourse },
          { path: ":id", component: DetailCourse },
        ]
      },

    ]
  },
  { path: "help-desk/*", component: <Page type={"helpDesk"} />, childs: [

      {
        path: "tickets/*", childs: [

          { path: "", component: ListClasse },
          { path: "list", component: ListClasse },
          { path: "new", component: NewClasse },
          { path: ":id/update", component: UpdateClasse },
          { path: ":id", component: DetailsClasse },
        ]
      },
      {
        path: "chat/*", childs: [

          { path: "", component: Chat },
          { path: "list", component: Chat },
          { path: "new/*", component: NewClassRoom },
          { path: "update/:id/*", component: UpdateClassRoom },
          { path: ":id", component: DetailsClassRoom },
        ]
      }]
    },
  { path: "*", component: NotFound },

];

