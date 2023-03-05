import Moment from 'react-moment';
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Api, services } from '../../../../app/api/Api';
import { Disabled } from './tabs/Disabled';
import { TabCurricularPlan } from './tabs/TabCurricularPlan';
import { TabHistory } from './tabs/TabHistory';
import { TabDashBoard } from './tabs/TabDashBoard';
import { TabStudentCourseList } from './tabs/TabStudentCourseList';
import { TabClassList } from './tabs/TabClassList';

export const DetailCourse = () => {
  const { id } = useParams()

  const [tab, setTab] = useState(3);
  const [course, setCourse] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  useMemo(async () => {
    setLoading(true)
    const { response: { data: response } } = await Api.get({ service: services.academic.course, id })
    setCourse(response)
    setLoading(false)
  }, [])

  const tabsTitles = ['Inicio', 'Turmas', 'Estudantes', 'Plano Curricular', 'Histórico']
  const Tabs = [TabDashBoard, TabClassList, TabStudentCourseList, TabCurricularPlan, History][tab]

  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          <h4 className="az-dashboard-title">Curso - {course?.code}</h4>
          <h2 className="az-dashboard-title">{course?.name}</h2>
          <p className="az-dashboard-text">{course?.descriptions}</p>
        </div>
        <div className="az-content-header-right">

          <div className="media">
            <div className="media-body text-right">
              <label>Turmas</label>
              <h6>{course?.classys?.length ?? "-"}</h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Data de registo</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {course?.createdAt ?? '.'}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {course?.createdAt}
                </Moment>
              </span>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              {course?.isActive ?
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
          <Link className="nav-link" to={`/pedagogical/courses/update/${course?.id}`}><i className="far fa-edit"></i> Editar</Link>
          <a className="nav-link" href="#"><i className="far fa-file-pdf"></i> Exportar em PDF</a>
          <a className="nav-link" href="#"><i className="far fa-envelope"></i>Partilhar por Email</a>
          <a className="nav-link" href="#"><i className="fas fa-ellipsis-h"></i></a>
        </nav>
      </div>

      <div className="row row-sm mg-b-20">
        {loading ? null : course?.isActive ? <Tabs course={course} /> : <Disabled text={"Turma desactivada"} />}
      </div>
    </div>
  )
}

const History = ({ course }: any) => {

  return <TabHistory modelName={'Course'} objectId={course.id} />
}
