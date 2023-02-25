import Moment from 'react-moment';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosFetch, { services } from '../../../../api/Api';
import { ProgressBar } from 'react-bootstrap';
import { TabStudentClassyList } from './tabs/TabStudentClassyList';
import { TabScheduleClass } from './tabs/TabScheduleClass';
import { TabAssessmentClassy } from './tabs/TabAssessmentClassy';
import { Disabled } from './tabs/Disabled';

export const DetailsClassy = () => {
  const { id } = useParams()

  const [tab, setTab] = useState(0);

  const { data: classy, loading } = useAxiosFetch(services.academic.class + "/" + id)

  const tabsTitles = ['Estudantes', 'Horario', 'Pautas', 'Histórico']
  const Tabs = [TabStudentClassyList, TabScheduleClass, TabAssessmentClassy, TabAssessmentClassy][tab]


  const persent = (classy: any) => ((classy?.enrollmentConfirmations?.length ?? 1) / (classy?.classyRoom?.size ?? 1)) * 100;


  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          <h2 className="az-dashboard-title">Turma #{classy?.code}</h2>
          <p className="az-dashboard-text">{classy?.descriptions}</p>
          <p className="az-dashboard-text">{classy?.classyRoom?.size}/{classy?.enrollmentConfirmations?.length}</p>

          <ProgressBar now={persent(classy)} label={`${persent(classy)}%`} />
        </div>
        <div className="az-content-header-right">
          <div className="media">
            <div className="media-body text-right">
              <label>Sala</label>
              <h6>{classy?.classyRoom?.code ?? "-"}</h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Semestre</label>
              <h6>{classy?.academicShift?.code ?? "-"}</h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Turno</label>
              <h6>{classy?.academicPeriod?.code ?? "-"}</h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Data de registo</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {classy?.createdAt ?? '.'}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {classy?.createdAt}
                </Moment>
              </span>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Ultimaactualziação</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {classy?.updateddAt}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {classy?.updateddAt}
                </Moment>
              </span>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              {classy?.isActive ?
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
          <Link className="nav-link" to={`/pedagogical/classy/update/${classy?.id}`}><i className="far fa-save"></i> Editar</Link>
          <a className="nav-link" href="#"><i className="far fa-file-pdf"></i> Exportar em PDF</a>
          <a className="nav-link" href="#"><i className="far fa-envelope"></i>Partilhar por Email</a>
          <a className="nav-link" href="#"><i className="fas fa-ellipsis-h"></i></a>
        </nav>
      </div>

      <div className="row row-sm mg-b-20">
        {loading ? null : classy?.isActive  ? <Tabs classy={classy}/>:<Disabled text={"Turma desactivada"}/>}
      </div>
    </div>
  )
}

