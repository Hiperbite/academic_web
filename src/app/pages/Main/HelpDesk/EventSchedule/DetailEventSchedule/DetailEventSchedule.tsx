import Moment from 'react-moment';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TabCurricularPlan } from './tabs/TabCurricularPlan';
import { TabHistory } from './tabs/TabHistory';
import { TabStudentCourseList } from './tabs/TabStudentCourseList';
import { TabClassList } from './tabs/TabClassList';
import { Badge, Button, Col, ListGroup, ProgressBar } from 'react-bootstrap';
import { useApi } from '../../../../../app/api/apiSlice';
import { services } from '../../../../../app/api/services';
import Select from 'react-select'
import moment from 'moment';

const stateColors:any={
  Rejected:'danger',Pending:'default',Opened:'warning', Aproved:'primary', Done:'success'
}
export const DetailEvent = () => {
  const { id } = useParams()
  const [tab, setTab] = useState(0);
  const [activeStates, setActiveStates] = useState([]);
  const [attendedById, setAttendedById] = useState();
  const [trackPageSize, setTrackPageSize] = useState(3);

  const { data: updatedEvent, resolve: update, loading: loadingUpdatedEvent } =
    useApi({ service: services.helpDesk.events.update, id })

  const { data: event, loading } =
    useApi({ service: services.helpDesk.events.get, id ,params:{updatedEvent}})

  const { data: { data: states } = {}, loading: loadingState } =
    useApi({ service: services.helpDesk.events.get })

  const { data: { data: staffs } = {}, loading: loadingStaffs } =
    useApi({ service: services.staff.staff.get, params: { pageSize: 20 } })

  const { data: { data: tracks, total: totalTracks } = {}, loading: loadingTrack } =
    useApi({ service: services.common.track.get, params: {event, pageSize: trackPageSize, 'where[model]': 'Event', 'where[ref]': id } })

  const tabsTitles = ['Detalhes']
  const Tabs = [TabClassList, TabStudentCourseList, TabCurricularPlan, History][tab]

  useEffect(() => {
    if (attendedById)
      update({ form: { attendedById } })
  }, [attendedById])

  useEffect(() => {
    setActiveStates(states?.filter(({code}:any)=>event?.nextStates?.includes(code??'')))
  }, [states, event])
const updateState=(stateId:string)=>{
  update({ form: { stateId } })
}
  return (
    <div className="az-content-body">
      <div className="az-dashboard-one-title">
        <div>
          <h4 className="az-dashboard-title">Event </h4>
          <h3 className="">{event?.code} - {event?.type?.name}</h3>
        </div>
        <div className="az-content-header-right">
          <div className="media">
            <div className="media-body text-right">
              <label>Data de registo</label>
              <h6>
                <Moment format="DD [de] MMMM  [de] YYYY">
                  {event?.createdAt ?? '.'}
                </Moment></h6>
              <span>
                <Moment format="dddd [as] h:m">
                  {event?.createdAt}
                </Moment>
              </span>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              <button className={`btn btn-sm btn-${event?.isActive?'success':'danger'}`}>{event?.isActive?'Activo':'Inactivo'}</button>
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
          <Link className="nav-link" to={`../${event?.id}/update`}><i className="fa fa-edit"></i></Link>
          <a className="nav-link" href="#"><i className="fa fa-print"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-envelope"></i></a>
          <a className="nav-link" href="#"><i className="fa fa-history"></i></a>
          <Link className="nav-link" to="" onClick={() => setTab(3)}><i className="fa fa-history"></i></Link>
        </nav>

      </div>

      <div className="row row-sm mg-b-20">
        <Col md={9}>
          <div className="html-text" dangerouslySetInnerHTML={{ __html: event?.descriptions ??'' }} />
        </Col>
        <Col>

          <ListGroup>
            <ListGroup.Item>
              <label>Acções</label>
              <Button style={{ width: '100%' }} variant={"outline-primary"} className='text-left'>
                  Agendar
                </Button>
              {' '}
            </ListGroup.Item>
            
            <ListGroup.Item>
              <ProgressBar  style={{height:5}} now={Object.keys(stateColors).indexOf(event?.state?.code)*100/4} variant={stateColors[event?.state?.code]}/>
            </ListGroup.Item>
          </ListGroup>
          <hr />
          <ListGroup>
            <ListGroup.Item>
              <label>Atribuido à </label>
              {staffs ? <Select options={staffs?.map((staff: any) => ({ label: staff?.person?.fullName, value: staff?.id }))} onChange={(e: any) => setAttendedById(e?.value)} isClearable />
                : null}
            </ListGroup.Item>
            <ListGroup.Item>
              <label>Requisitante</label><br />
              <b>{event?.user?.person?.fullName}</b><br />
              {event?.user?.person?.students
                ? <Badge bg="primary">  Estudante</Badge>
                : <Badge bg="warning" text="dark">Funcionario</Badge>}
            </ListGroup.Item>
          </ListGroup>
          <hr />
          
          <ListGroup>
                {tracks?.map(({ user,after, before, createdAt }: any) => <ListGroup.Item>
                  
                  <Badge bg={stateColors[states?.find(({id}:any)=>after?.stateId===id)?.code]}
                  style={{    height: '16px',
                    width: '16px',
                    borderRadius: '100px',
                    marginLeft: '-25px',
                    marginRight: '5px'}}>
                    {' '}
                  </Badge>
                  {user?.person?.fullName}
                  <small>{' '}{after?.stateId ? 'Alterou para o estado' : ''}</small>
                  {' '}
                  {states.find(({id}:any)=>after?.stateId===id)?.descriptions}
                  <br /><small style={{ fontSize: '10px' }}>{moment(createdAt).fromNow()} | {moment(createdAt).format('[as] HH:mm:ss [,] DD [de] MMMM [de] YYYY')}</small>
                </ListGroup.Item>)}
          {trackPageSize < totalTracks ? 
            <small onClick={()=>setTrackPageSize(trackPageSize+3)}>Ver mais <i className={'fa fa-plus'}></i></small> : 
            <ListGroup.Item>
              {event?.user?.person?.fullName} <b>Registou</b>
              <br /><small style={{ fontSize: '10px' }}>{moment(event?.createdAt).format('[as] HH:mm:ss [,] DD [de] MMMM [de] YYYY')}</small>
              </ListGroup.Item>
              }
              </ListGroup>
              
        </Col>
      </div>
    </div>
  )
}

const History = ({ event }: any) => {

  return <TabHistory modelName={'Course'} objectId={event.id} />
}
