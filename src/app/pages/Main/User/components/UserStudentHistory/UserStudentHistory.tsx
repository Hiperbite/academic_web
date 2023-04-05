import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import Moment from 'react-moment'
import { useLocation } from 'react-router-dom'
import { Api, services } from '../../../../app/api/Api'
import './UserStudentHistory.scss'
export const UserStudentHistory = () => {
  const [histories, setHistories] = useState<any[]>([])


  const location = useLocation();


  const { me, refresh } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      const { response: { data } } = await Api.get({ service: services.common.user.history, id: me?.id })
      setHistories(data)
    }
    fetchData();
  }, [me?.id])
  return (
    <div id='UserStudentHistory'>
      <div className="timeline">
        <div className="outer">
          {histories?.map(({descriptions, date, type}: any) =>
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
                  <Moment format='dddd [as] HH:mm:ss'>{date}</Moment><br/>
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
