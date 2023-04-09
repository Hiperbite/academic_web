import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import Moment from 'react-moment'
import { useLocation } from 'react-router-dom'
import { useApi } from '../../../../../app/api/apiSlice'
import { services } from '../../../../../app/api/services'
import './UserStudentHistory.scss'
export const UserStudentHistory = () => {



  const location = useLocation();


  const { me, refresh } = location.state;

  const { data: histories } = useApi({ service: services.common.users.history, id: me?.id })

  const { data: { data: enrollments } = {} } = useApi({ service: services.student.enrollment.getAll, params: { 'where[studentId]': me?.person?.student?.id } })

  return (
    <div id='UserStudentHistory'>
      .{JSON.stringify(enrollments?.length)}.
      {enrollments?.map(({classe}:any)=><Card>{classe?.code}</Card>)}
      <div className="timeline">
        <div className="outer">
          {histories?.map(({ descriptions, date, type }: any) =>
            <Card>
              <div className="info">
                <Row>
                  <Col md={9}>
                    <h6 className="title">{descriptions}</h6>
                  </Col>
                  <Col className='text-right'>

                    <Badge bg="warning" text="dark">
                      {type}
                    </Badge>{' '}
                  </Col>
                </Row>
                <p>
                  <Moment format='dddd [as] HH:mm:ss'>{date}</Moment><br />
                  <Moment format='DD [de] MMMM [de] YYYY'>{date}</Moment>
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
