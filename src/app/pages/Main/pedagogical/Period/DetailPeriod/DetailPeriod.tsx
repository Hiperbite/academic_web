import Moment from 'react-moment';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Disabled } from './tabs/Disabled';
import { TabClasseList } from './tabs/TabClasseList';
import { TabHistory } from './tabs/TabHistory';
import { AllowedFor } from '../../../../app/api/auth/RequireAuth';
import { useApi } from '../../../../../app/api/apiSlice';
import { services } from '../../../../../app/api/services';

export const DetailsPeriod = () => {
  const { id } = useParams()

  const [tab, setTab] = useState(0);

  const { data: period, loading } = useApi({ service: services.academic.period.getAll, id })

  const tabsTitles = ['Turmas', 'Histórico']
  const Tabs = [TabClasseList, History][tab]

  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          <h2 className="az-dashboard-title">Turno - {period?.code}</h2>
          <p className="az-dashboard-text">{period?.descriptions}</p>
        </div>
        <div className="az-content-header-right">

          <div className="media">
            <div className="media-body text-right">
              <label>Turmas</label>
              <h6>{period?.classes?.length ?? "-"}</h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Data de registo</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {period?.createdAt ?? '.'}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {period?.createdAt}
                </Moment>
              </span>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Ultimaactualziação</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {period?.updateddAt}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {period?.updateddAt}
                </Moment>
              </span>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              {period?.isActive ?
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
          <AllowedFor role={'TABLES'} level={3}>
            <Link className="nav-link" to={`/pedagogical/periods/update/${period?.id}`}><i className="fa fa-edit"></i></Link>
          </AllowedFor>
          <a className="nav-link" href="#"><i className="fa fa-share"></i> </a>
          <a className="nav-link" href="#"><i className="fa fa-envelope"></i> </a>
          <a className="nav-link" href="#"><i className="fa fa-ellipsis-h"></i></a>
        </nav>
      </div>

      <div className="row row-sm mg-b-20">
        {loading ? null : period?.isActive ? <Tabs period={period} /> : <Disabled text={"Turma desactivada"} />}
      </div>
    </div>
  )
}

const History = ({ period }: any) => {

  return <TabHistory modelName={'AcademicPeriod'} objectId={period.id} />
}
