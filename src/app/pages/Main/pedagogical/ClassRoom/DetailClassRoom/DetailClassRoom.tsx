import Moment from 'react-moment';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosFetch, { services } from '../../../../../app/api/Api';
import { ProgressBar } from 'react-bootstrap';
import { TabScheduleClass } from './tabs/TabScheduleClass';
import { Disabled } from './tabs/Disabled';
import { TabHistory } from '../../Period/DetailPeriod/tabs/TabHistory';
import { TabClasseList } from './tabs/TabClasseList';

export const DetailsClassRoom = () => {
  const { id } = useParams()

  const [tab, setTab] = useState(0);

  const { data: classRoom, loading } = useAxiosFetch(services.academic.classRoom + "/" + id)

  const tabsTitles = ['Turmas', 'Histórico']
  const Tabs = [TabClasseList, History][tab]


  const persent = (classRoom: any) => ((classRoom?.enrollmentConfirmations?.length ?? 1) / (classRoom?.classRoomRoom?.size ?? 1)) * 100;


  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          <h2 className="az-dashboard-title">Sala #{classRoom?.code}</h2>
          <p className="az-dashboard-text">{classRoom?.descriptions}</p>
        </div>
        <div className="az-content-header-right">

          <div className="media">
            <div className="media-body text-right">
              <label>Lugares</label>
              <h6>{classRoom?.size ?? "-"}</h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Ultimaactualziação</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {classRoom?.updateddAt}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {classRoom?.updateddAt}
                </Moment>
              </span>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              {classRoom?.isActive ?
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
          <Link className="nav-link" to={`/pedagogical/class-rooms/update/${classRoom?.id}`}><i className="fa fa-edit"></i></Link>
          <a className="nav-link" href="#"><i className="fa fa-share"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-envelope"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-ellipsis-h"></i></a>
        </nav>
      </div>

      <div className="row row-sm mg-b-20">
        {loading ? null : classRoom?.isActive ? <Tabs classRoom={classRoom} /> : <Disabled text={"Turma desactivada"} />}
      </div>
    </div>
  )
}




const History = ({ classRoom }: any) => {

  return <TabHistory modelName={'ClasseRoom'} objectId={classRoom?.id} />
}