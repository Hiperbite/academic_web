import { useGetStudentData } from "../../../app/api/students/students";

import Moment from 'react-moment';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataStudents } from "./DataStudents";
import { DocumentStudents } from "./DocumentStudents";
import { AssessmentStudents } from "./AssessmentStudents";
import { HistoryStudents } from "./HystoryStudents";
import { TabHistory } from "../../pedagogical/Period/DetailPeriod/tabs/TabHistory";
import { Badge, Button, Dropdown } from "react-bootstrap";
import { DetailsOptionsShow } from "./components/DetailsOptionsShow";
import { StudentEnrollment } from "./components/StudentEnrollment";
import { EventsStudents } from "./EventsStudents";

export const DetailsStudents = () => {
  const { id } = useParams()
  const [params, setParams] = useState({ id });
  const [tab, setTab] = useState(0);
  const [studentEnrollmentShow, studentEnrollmenthandleClose] = useState(false);
  const {
    data: student,
    loading,
  } = useGetStudentData(params, { studentEnrollmentShow });

  const tabsTitles = ['Detalhes', 'Documentos', 'Classificação', 'Histrico', 'Conclusão do curso',''].slice(0,student?.code ? -1 : 2)
  const Tabs = [DataStudents, DocumentStudents, AssessmentStudents, HistoryStudents, AssessmentStudents, History][tab]
  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          
          <h2 className="az-dashboard-title"># {student?.code ? student?.code : student?.entryCode}</h2>
          <h1>{student?.person?.fullName}</h1>
          <p className="az-dashboard-text">
            {student?.enrollment
              ? <Badge bg="primary"> Estudante matriculado </Badge>
              : <Badge bg="warning" text="dark">Candidato</Badge>}
            {!student?.isActive
              ? <Badge pill bg="danger">Suspenco</Badge>
            : null}
          </p>
        </div>
        <div className="az-content-header-right">
          {student?.code ? <>
          
            <div className="media">
              <div className="media-body text-right">
                <label>Ano</label>
                <h6>
                  {student?.enrollment?.classe?.grade} º
                </h6>
                <span>

                </span>
              </div>
            </div>
            <div className="media">
              <Link to={"/pedagogical/classe/" + student?.enrollment?.classe?.id} className="media-body text-right">
                <label>Turma</label>
                <h6>
                  {student?.enrollment?.classe?.code}
                </h6>
                <span>

                </span>
              </Link>
            </div>
          </> : <div className="media">
            <Button variant="primary" size="sm" onClick={() => studentEnrollmenthandleClose(true)}>Matricular</Button>
            <StudentEnrollment show={studentEnrollmentShow} handleClose={studentEnrollmenthandleClose} student={student} />
          </div>}
          <div className="media">
            <div className="media-body text-right">
              <label>Data de registo</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {student.createdAt}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {student.createdAt}
                </Moment>
              </span>
            </div>
          </div>

          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              {student?.isActive
                ? <Badge pill bg="success">Activo</Badge>
                : <Badge pill bg="danger">Inactivo</Badge>}
            </div>
          </div>
        </div>
      </div>

      <div className="az-dashboard-nav">
        <nav className="nav">
          {tabsTitles.map((title, i) =>
            <a href="#" className={`nav-link ${i == tab ? "active" : ""}`} onClick={() => setTab(i)}>{title}</a>)}
        </nav>

        <nav className="nav">
          <Link className="nav-link" to={''} onClick={() => setTab(5)}><i className="fa fa-history"></i></Link>
          <a className="nav-link" href="#"><i className="fa fa-print"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-envelope"></i></a>
          <a className="nav-link" href="#" ><i className="fa fa-ellipsis-h"></i></a>
          <a className="nav-link" href="#" ><i className="fa fa-ellipsis-h"></i></a>
        </nav>
      </div>

      <div className="row row-sm mg-b-20">
        <Tabs student={student} />
      </div>
    </div>
  )
}

const History = ({ student }: any) => {

  return <TabHistory modelName={'Student,Person,Contact, Address,Enrollment'} objectId={
    [student?.personId, student?.person?.livingAddressId, student?.person?.birthPlaceAddressId].join(',')
  } />
}

