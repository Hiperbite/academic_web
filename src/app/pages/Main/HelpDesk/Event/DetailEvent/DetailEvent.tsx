import Moment from 'react-moment';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TabCurricularPlan } from './tabs/TabCurricularPlan';
import { TabHistory } from './tabs/TabHistory';
import { TabStudentCourseList } from './tabs/TabStudentCourseList';
import { TabClassList } from './tabs/TabClassList';
import { Badge, Button, Card, Col, ListGroup, Modal, ProgressBar, Row } from 'react-bootstrap';
import { useApi } from '../../../../../app/api/apiSlice';
import { services } from '../../../../../app/api/services';
import moment from 'moment';
import { EventScheduleForm } from '../../EventSchedule/NewEventSchedule';

const stateColors: any = {
  Rejected: 'danger', Pending: 'default', Opened: 'warning', Aproved: 'primary', Done: 'success'
}
export const DetailEvent = () => {
  const { id } = useParams()
  const [tab, setTab] = useState(0);
  const [isShowScheduleModal, setShowScheduleModal] = useState(false);
  const [schedule, setSchedule] = useState<any>();
  const [refresh, setRefresh] = useState();
  const [attendedById, setAttendedById] = useState();
  const [trackPageSize, setTrackPageSize] = useState(3);

  const { data: updatedEvent, resolve: update, loading: loadingUpdatedEvent } =
    useApi({ service: services.helpDesk.events.update, id })

  const { data: event, loading } =
    useApi({ service: services.helpDesk.events.get, id, params: { updatedEvent, refresh } })

  const { data: { data: states } = {}, loading: loadingState } =
    useApi({ service: services.helpDesk.events.get })

  const { data: { data: staffs } = {}, loading: loadingStaffs } =
    useApi({ service: services.staff.staff.get, params: { pageSize: 20 } })

  const { data: { data: tracks, total: totalTracks } = {}, loading: loadingTrack } =
    useApi({ service: services.common.track.get, params: { event, pageSize: trackPageSize, 'where[model]': 'Event', 'where[ref]': id } })

  const tabsTitles = ['Detalhes']
  const Tabs = [TabClassList, TabStudentCourseList, TabCurricularPlan, History][tab]

  useEffect(() => {
    if (attendedById)
      update({ form: { attendedById } })
  }, [attendedById])

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
                <Moment format="dddd [as] hh:m">
                  {event?.createdAt}
                </Moment>
              </span>
              <small style={{fontSize:9}}><br/>{moment(event?.updatedAt).fromNow()}</small>
            </div>
          </div>
          <div className="media">
            <div className="media-body text-right">
              <label>Estado</label><br />
              <button onClick={()=>update({ form: { isActive: !event?.isActive} })} className={`btn btn-sm btn-${event?.isActive ? 'success' : 'danger'}`}>{event?.isActive ? 'Activo' : 'Inactivo'}</button>
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
          <div className="html-text" dangerouslySetInnerHTML={{ __html: event?.descriptions ?? '' }} />
          
        </Col>
        <Col>

          <ListGroup>
            <ListGroup.Item>
              <label>Acções</label>
              <Button onClick={() => {setShowScheduleModal(true);setSchedule({event})}} style={{ width: '100%' }} variant={"outline-primary"} className='text-left'>
                Agendar
              </Button>
              {' '}
            </ListGroup.Item>
          </ListGroup>
          <hr />
          <ListGroup>
            {event?.activeSchedules?.map((schedule: any) => <>
              <ListGroup.Item>
                <small><i className="fa fa-calendar"></i> <b>{moment(schedule?.start).format('DD[/]MM[/]YYYY')}</b> á <b>{moment(schedule?.end).format('DD[/]MM[/]YYYY')}</b></small>
                <i className="fa fa-edit pull-right" onClick={() => {setShowScheduleModal(true);setSchedule({...schedule,event})}}></i>
                <Badge bg="secondary">{moment(schedule?.end).diff(moment(schedule?.start), 'days')+1} dias</Badge> {' '}
                <Badge bg="warning" text="dark">{schedule?.privacy}</Badge>
                <small className='pull-right text-right' style={{ fontSize: '10px' }}>
                  {moment(schedule?.createdAt).fromNow()}
                </small>
              </ListGroup.Item>
            </>)}
          </ListGroup>
          <hr />

          <ListGroup>
            {tracks?.map(({ user, after, before, createdAt }: any) => <ListGroup.Item>

              <Badge bg={stateColors[states?.find(({ id }: any) => after?.stateId === id)?.code]}
                style={{
                  height: '16px',
                  width: '16px',
                  borderRadius: '100px',
                  marginLeft: '-25px',
                  marginRight: '5px'
                }}>
                {' '}
              </Badge>
              {user?.person?.fullName}
              <small>{' '}{after?.stateId ? 'Alterou para o estado' : ''}</small>
              {' '}
              {states.find(({ id }: any) => after?.stateId === id)?.descriptions}
              <br /><small style={{ fontSize: '10px' }}>{moment(createdAt).fromNow()} | {moment(createdAt).format('[as] HH:mm:ss [,] DD [de] MMMM [de] YYYY')}</small>
            </ListGroup.Item>)}
            {trackPageSize < totalTracks ?
              <small onClick={() => setTrackPageSize(trackPageSize + 3)}>Ver mais <i className={'fa fa-plus'}></i></small> :
              <ListGroup.Item>
                {event?.user?.person?.fullName} <b>Registou</b>
                <br /><small style={{ fontSize: '10px' }}>{moment(event?.createdAt).format('[as] HH:mm:ss [,] DD [de] MMMM [de] YYYY')}</small>
              </ListGroup.Item>
            }
          </ListGroup>

        </Col>
      </div>
      <EventScheduleModal schedule={schedule} setRefresh={setRefresh} show={isShowScheduleModal} handleClose={() => setShowScheduleModal(false)} />    
    </div>
  )
}

const History = ({ event }: any) => {

  return <TabHistory modelName={'Course'} objectId={event.id} />
}

const ScheduleCard = ({ schedule }: any) => {
  return (<Card>
    <Card.Body>

      <Card.Title>{schedule?.code}
        <small className='pull-right'>{moment(schedule?.createdAt).fromNow()}</small>
      </Card.Title>
      <Row>
        <Col>
          <small>Duração: <b>{moment(schedule?.end).diff(moment(schedule?.start), 'days')} dias</b> </small><br />
          <small></small><br />
          <small>Data de Inicio: <b>{moment(schedule?.start).format('dddd[, dia ] D [de] MMMM [de] YYYY')}</b></small><br />
          <small>Data de Fim: <b>{moment(schedule?.end).format('dddd[, dia ] D [de] MMMM [de] YYYY')}</b></small><br /></Col>
      </Row>
      <Card.Text>


      </Card.Text>
      <Button variant="primary" size='sm'></Button>
      {schedule?.isActive ? null : <Button variant="danger" size='sm'>Desactivado</Button>}
    </Card.Body>
  </Card>)
}

const EventScheduleModal = ({schedule, show, handleClose, setRefresh }: any) => {

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EventScheduleForm schedule={schedule} handleClose={handleClose} setRefresh={setRefresh} />
        </Modal.Body>
      </Modal>
    </>
  );
}