import Moment from 'react-moment';
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Api, services } from '../../../../app/api/Api';
import { Disabled } from './tabs/Disabled';
import { TabClassyList } from './tabs/TabClassyList';
import { TabHistory } from './tabs/TabHistory';

export const DetailDiscipline = () => {
  const { id } = useParams()

  const [tab, setTab] = useState(0);
  const [discipline, setDiscipline] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  useMemo(async () => {
    setLoading(true)
    const { response: { data: response } } = await Api.get({ service: services.academic.discipline, id })
    setDiscipline(response)
    setLoading(false)
  }, [])

  const tabsTitles = ['Cursos', 'Histórico']
  const Tabs = [TabClassyList, History][tab]

  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          <h4 className="az-dashboard-title">Disciplina - {discipline?.code}</h4>
          <h2 className="az-dashboard-title">{discipline?.name}</h2>
          <p className="az-dashboard-text">{discipline?.descriptions}</p>
        </div>
        <div className="az-content-header-right">

          <div className="media">
            <div className="media-body text-right">
              <label>Cursos</label>
              <h6>{discipline?.classys?.length ?? "-"}</h6>
            </div>
          </div>
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
          <Link className="nav-link" to={`/pedagogical/disciplines/update/${discipline?.id}`}><i className="far fa-edit"></i> Editar</Link>
          <a className="nav-link" href="#"><i className="far fa-file-pdf"></i> Exportar em PDF</a>
          <a className="nav-link" href="#"><i className="far fa-envelope"></i>Partilhar por Email</a>
          <a className="nav-link" href="#"><i className="fas fa-ellipsis-h"></i></a>
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
