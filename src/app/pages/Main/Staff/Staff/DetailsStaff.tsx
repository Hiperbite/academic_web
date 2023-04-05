import Moment from 'react-moment';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge, Button } from "react-bootstrap";
import { DataStaff } from "./DataStaff";
import { useGetStaffData } from "../../../../app/api/staff/staff";
import { DocumentStaffs } from './DocumentStaff';
import { AssessmentStaffs } from './AssessmentStaff';
import { HistoryStaffs } from './HystoryStaff';
import { StaffEnrollment } from './components/StaffEnrollment';
import { StaffDiscipline } from './StaffDiscipline';
import { TabHistory } from '../../pedagogical/Period/DetailPeriod/tabs/TabHistory';
import { UserAccess } from './UserAccess/UserAccess';

export const DetailsStaff = () => {
  const { id } = useParams()
  const [params, setParams] = useState({ id });
  const [tab, setTab] = useState(0);
  const [staffEnrollmentShow, staffEnrollmenthandleClose] = useState(false);
  const {
    data: staff,
    loading,
  } = useGetStaffData(params, { staffEnrollmentShow });

  const tabsTitles = ['Detalhes', 'Documentos',    'Disciplinas',   'Turmas',     'Historicos', 'Acessos']
  const Tabs =       [DataStaff,   DocumentStaffs, StaffDiscipline, HistoryStaffs, History,     UserAccess][tab]
  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          <h2 className="az-dashboard-title"># {staff?.enrollment ? staff?.enrollment?.code : staff?.code}</h2>
          <h1>{staff?.person?.firstName} {staff?.person?.otherName} {staff?.person?.lastName}</h1>
          <p className="az-dashboard-text">
            {staff?.roles?.map((r: string) => <Badge bg="primary"> {r} </Badge>)}
          </p>
        </div>
        <div className="az-content-header-right">
          <div className="media">
            <div className="media-body text-right">
              <label>Careira</label>
              <h6>
                {staff?.career?.code} - {staff?.career?.name}
              </h6>
            </div>
          </div>

          <div className="media">
            <div className="media-body text-right">
              <label>Categoria</label>
              <h6>
                {staff?.category?.code} - {staff?.category?.name}
              </h6>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Data de registo</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {staff.createdAt}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {staff.createdAt}
                </Moment>
              </span>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              {staff?.isActive ?
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
          <Link className="nav-link" to={''} onClick={() => setTab(5)}><i className="fa fa-history"></i></Link>
          <a className="nav-link" href="#"><i className="fa fa-print"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-envelope"></i></a>
          <a className="nav-link" href="#" ><i className="fa fa-ellipsis-h"></i></a>
          <a className="nav-link" href="#" ><i className="fa fa-ellipsis-h"></i></a>
        </nav>
      </div>

      <div className="row row-sm mg-b-20">
        <Tabs staff={staff} />
      </div>
    </div>
  )
}

const History = ({ staff }: any) => {

  return <TabHistory modelName={'Staff,Person,Contact, Address,Enrollment'} objectId={
    [staff?.personId, staff?.person?.livingAddressId, staff?.person?.birthPlaceAddressId].join(',')
  } />
}

