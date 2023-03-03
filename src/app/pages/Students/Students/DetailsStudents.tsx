import { useGetStudentData } from "../../../app/api/students/students";

import Moment from 'react-moment';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataStudents } from "./DataStudents";
import { DocumentStudents } from "./DocumentStudents";
import { AssessmentStudents } from "./AssessmentStudents";
import { HistoryStudents } from "./HystoryStudents";
import { TabHistory } from "../../pedagogical/Period/DetailPeriod/tabs/TabHistory";
import { Badge } from "react-bootstrap";

export const DetailsStudents = () => {
  const { id } = useParams()
  const [params, setParams] = useState({ id });
  const [tab, setTab] = useState(0);
  const {
    data: student,
    loading,
  } = useGetStudentData(params);
  const tabsTitles = ['Detalhes', 'Documentos', 'Exames', 'Histórico']
  const Tabs = [DataStudents, DocumentStudents, AssessmentStudents, History][tab]
  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          <h2 className="az-dashboard-title"># {student?.enrollment ? student?.enrollment?.code : student?.code}</h2>
          <h1>{student?.person?.firstName} {student?.person?.otherName} {student?.person?.lastName}</h1>
          <p className="az-dashboard-text">
            {student?.enrollment
              ? <Badge bg="primary"> Estudante matriculado </Badge>
              : <Badge bg="warning" text="dark">Candidato</Badge>}</p>

        </div>
        <div className="az-content-header-right">
          {student?.enrollment ? <>
            <div className="media">
              <div className="media-body text-right">
                <label>Ano</label>
                <h6>
                  {student?.enrollment?.current?.classy?.grade} º
                </h6>
                <span>

                </span>
              </div>
            </div>
            <div className="media">
              <Link to={"/pedagogical/classy/" + student?.enrollment?.current?.classy?.id} className="media-body text-right">
                <label>Turma</label>
                <h6>
                  {student?.enrollment?.current?.classy?.code}
                </h6>
                <span>

                </span>
              </Link>
            </div>
          </>:null}
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
              {student?.isActive ?
                <button className="btn btn-success btn-sm">Activo</button> :
                <button className="btn btn-danger btn-sm">Inactivo</button>}
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
          <Link className="nav-link" to={"/students/update/"+student.id}><i className="far fa-edit"></i> Editar</Link>
          <a className="nav-link" href="#"><i className="far fa-file-pdf"></i> Exportar em PDF</a>
          <a className="nav-link" href="#"><i className="far fa-envelope"></i>Partilhar por Email</a>
          <a className="nav-link" href="#"><i className="fas fa-ellipsis-h"></i></a>
        </nav>
      </div>

      <div className="row row-sm mg-b-20">
        <Tabs student={student} />
      </div>
    </div>
  )
}

const History = ({ student }: any) => {

  return <TabHistory modelName={'Student'} objectId={student?.id} />
}

