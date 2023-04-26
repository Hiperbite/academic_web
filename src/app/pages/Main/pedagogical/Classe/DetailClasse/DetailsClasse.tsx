import Moment from 'react-moment';
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from 'react-bootstrap';
import { TabStudentClasseList } from './tabs/TabStudentClasseList';
import { TabScheduleClass } from './tabs/TabScheduleClass';
import { TabAssessmentClasse } from './tabs/TabAssessmentClasse';
import { Disabled } from './tabs/Disabled';
import { TabHistory } from '../../Period/DetailPeriod/tabs/TabHistory';
import { useApi } from '../../../../../app/api/apiSlice';
import { services } from '../../../../../app/api/services';
import { AuthContext } from '../../../../../../App';

export const DetailsClasse = () => {
  const { id } = useParams()

  const { user }: any = useContext(AuthContext);
  const [tab, setTab] = useState(0);

  const { data: classe, loading } = useApi({ service: services.academic.class.getAll, id, params: { id } })

  const { data: { data: staff } = {} } = useApi({ service: services.staff.staff.get, params: { 'where[personId]': user?.personId, pageSize: 1 } })
  const tabsTitles = ['Estudantes', 'Horario', 'Pautas', 'Histórico']
  const Tabs = [TabStudentClasseList, TabScheduleClass, TabAssessmentClasse, History][tab]


  const persent = (classe: any) => Number((((classe?.activeEnrollments?.length ?? 1) / (classe?.classeRoom?.size ?? 1)) * 100).toFixed(2));


  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          <h2 className="az-dashboard-title">Turma #{classe?.code}</h2>
          <p className="az-dashboard-text">{classe?.descriptions}</p>
          <h4 className="az-dashboard-title"><Link to={`/pedagogical/courses/${classe?.course?.id}`}>#{classe?.course?.code} - {classe?.course?.name}</Link></h4>

          <ProgressBar now={persent(classe)} label={`${persent(classe)}%`} />
        </div>
        <div className="az-content-header-right">
          <div className="media">
            <div className="media-body text-right">
              <label>Sala</label>
              <h6>{classe?.activeEnrollments?.length}/{classe?.classeRoom?.size}</h6>
            </div>
          </div><div className="media">
            <div className="media-body text-right">
              <label>Sala</label>
              <h6>{classe?.classeRoom?.code ?? "-"}</h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label> Ano</label>
              <h6>{classe?.grade ? `${classe?.grade} º ` : "-"} </h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label> Sem</label>
              <h6>{classe?.semester}º </h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Turno</label>
              <h6>{classe?.period?.descriptions ?? "-"}</h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Data de registo</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {classe?.createdAt ?? '.'}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] hh:mm">
                  {classe?.createdAt}
                </Moment>
              </span>
            </div>
          </div>

          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              {classe?.isActive ?
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
          <Link className="nav-link" to={`/pedagogical/classe/update/${classe?.id}`}><i className="fa fa-edit"></i></Link>
          <a className="nav-link" href="#"><i className="fa fa-share"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-envelope"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-ellipsis-h"></i></a>
        </nav>
      </div>

      <div className="row row-sm mg-b-20">
        {loading ? null : classe?.isActive ? staff ? <Tabs classe={classe} staff={staff[0]} /> : null: <Disabled text={"Turma desactivada"} />}
      </div>
    </div>
  )
}


const History = ({ classe }: any) => {

  return <TabHistory modelName={'Classe'} objectId={classe?.id} />
}