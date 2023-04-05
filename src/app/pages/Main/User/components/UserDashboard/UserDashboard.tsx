import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { services } from '../../../../../app/api/Api'
import { Api } from '../../../../app/api/Api'
import { Calendar } from '../Calendar/Calendar'
import { TimeLineA } from '../Gadgets/TimeLineA'
import { ClassColleges } from './ClassColleges'
import './UserDashboard.scss'
export const UserDashboard = () => {
  const location = useLocation()
  const [enrollment, setEnrollment] = useState<any>()
  useEffect(() => {
    const fetchData = async () => {
      const { response: { data: { data: response } } } = await Api.get({ service: services.student.enrollment, params: { 'where[studentId]': me?.person?.students[0]?.id, 'where[current]': true } })
      setEnrollment(response[0])
    }
    fetchData()
  }, [])
  const { me } = location.state;
  return (
    <>

      <Row id="UserDashboard">
        <Col md={6}>

          <Card className="blur-card">
            <Calendar />
          </Card>
        </Col>

        <Col>
          <Row>
            <Col md={6}>
              <Card>
                <h6>Turma</h6>
                <h3>{enrollment?.classe?.code}</h3>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <h6>sala</h6>
                <h3>{enrollment?.classe?.classeRoom?.code}</h3>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <h6>Ano</h6>
                <h3>{enrollment?.classe?.grade}º</h3>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <h6>Semestre</h6>
                <h3>{enrollment?.classe?.semester}º</h3>
              </Card>
            </Col>
            <Col md={6}>
              <Card>

                <h6>Curso</h6>
                <h3>{enrollment?.classe?.course?.name}</h3>
                <span>{enrollment?.classe?.course?.descriptions}</span>

              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <h6>Curso</h6>
                <h3>{enrollment?.classe?.period?.code}</h3>
                <span>{enrollment?.classe?.period?.descriptions}</span>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      {enrollment ? <ClassColleges classe={enrollment?.classe} />: null}
     
    </>
  )
}
