import Moment from 'react-moment';
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Disabled } from './tabs/Disabled';
import { TabHistory } from './tabs/TabHistory';
import { TabClasseList } from './tabs/TabClasseList';
import { AllowedFor } from '../../../../app/api/auth/RequireAuth';
import { useApi } from '../../../../../app/api/apiSlice';
import { services } from '../../../../../app/api/services';

export const DetailDiscipline = () => {
  const { id } = useParams()
  const [tab, setTab] = useState(0);
  const { data: discipline, loading } = useApi({ service: services.academic.discipline.getAll, id })
  const tabsTitles = ['Cursos', 'Histórico']
  const Tabs = [TabClasseList, History][tab]

  return (
    <div className="az-content-body">
      <div className="az-content-breadcrumb">
        <span>Academicos</span>
        <span>Disciplinas</span>
        <span>{discipline?.code} - {discipline?.name}</span>
      </div>
      <div className="az-dashboard-one-title">
        <div>
          <h4 className="az-dashboard-title">Disciplina</h4>
          <h2 className="">{discipline?.code} - {discipline?.name}</h2>
          <p style={{ maxWidth: "600px" }} className="az-dashboard-text">{discipline?.descriptions}</p>
        </div>
        <div className="az-content-header-right">

          <div className="media">
            <div className="media-body text-right">
              <label>Data de registo</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {discipline?.createdAt ?? '.'}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {discipline?.createdAt}
                </Moment>
              </span>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              {discipline?.isActive ?
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
          <AllowedFor role={'TABLES'} level={2}>
            <Link className="nav-link" to={`/pedagogical/disciplines/update/${discipline?.id}`}><i className="fa fa-edit"></i></Link>
          </AllowedFor>
          <a className="nav-link" href="#"><i className="fa fa-print"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-envelope"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-ellipsis-h"></i></a>
        </nav>
      </div>

      <div className="row row-sm mg-b-20">
        {loading ? null : discipline?.isActive ? <Tabs discipline={discipline} /> : <Disabled text={"Turma desactivada"} />}
      </div>
    </div>
  )
}

const History = ({ discipline }: any) => {

  return <TabHistory modelName={'Discipline'} objectId={discipline.id} />
}
