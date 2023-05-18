
import moment from 'moment';
import React from 'react'
import { Button, Card, ProgressBar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../../../app/api/apiSlice';
import { services } from "../../../../app/api/services";

export const StudentsInscriptionsGadgets = ({ data }: any) => {

    const { data: { data: students } = {} } = useApi({ service: services.student.students.getAll, params: { pageSize: 5, 'order_by[createdAt]': 'ASC', code: null } })
    const navigate=useNavigate()
    return (
        <Card className="card-dashboard-four">
            <Card.Header>
                <h6 className="pull-left">Últimos Inscritos</h6>
                <Link to={'/students/list'}><Button className='pull-right btn-sm' variant='secondary' >Ver mais</Button></Link>
            </Card.Header>{/* card-header */}
            <Card.Body style={{padding:0}}>
                {students?.map((student: any) =>
                    <div className="az-list-item hover" onClick={()=>navigate('/students/show/'+student?.id)}>
                        <div>
                            <small>{student?.person?.fullName}</small><br/>
                            <small><b className="tx-primary">{student?.entryCode}</b></small><br />
                            <span>{student?.desiredCourse?.name ?? '-'}</span>
                        </div>
                        <div>
                            <small className="tx-primary">{moment(student?.createdAt).fromNow()}</small><br/>
                            <span>{moment().diff(moment(student?.createdAt), 'days')<=1 ? moment(student?.createdAt).format('[hoje ás] HH:mm') : moment(student?.createdAt).format('dddd[,] DD [de] MMMM ')}</span><br />
                            <div className="az-traffic-detail-item">
                                <ProgressBar now={moment().diff(moment(student?.createdAt), 'days')} visuallyHidden />
                            </div>
                        </div>
                    </div>
                    )}
            </Card.Body>
        </Card>
    )
}

