
import moment from 'moment';
import React, { useMemo } from 'react'
import { Card, ProgressBar } from 'react-bootstrap'
import { useApi } from '../../../../app/api/apiSlice';
import { services } from "../../../../app/api/services";



export const StudentsInscriptionsGadgets = ({ data }: any) => {

    const { data: { data: students } = {} } = useApi({ service: services.student.students.getAll, params: { pageSize: 5, 'order_by[createdAt]': 'ASC', code: null } })
    useMemo(() => {

    }, [data])
    return (
        <Card className="card-dashboard-four">
            <Card.Header>
                <h6 className="card-title">Últimos Inscritos</h6>
            </Card.Header>{/* card-header */}
            <Card.Body style={{padding:0}}>
                {students?.map((student: any) =>
                    <div className="az-list-item">
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
                    </div>)}
            </Card.Body>
        </Card>
    )
}

