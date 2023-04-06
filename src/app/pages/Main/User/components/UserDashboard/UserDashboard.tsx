import React, { useEffect, useMemo, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useApi } from '../../../../../app/api/apiSlice'
import { services } from '../../../../../app/api/services'
import storage from '../../../../app/storage'
import { Calendar } from '../Calendar/Calendar'
import { ClassColleges } from './ClassColleges'
import './UserDashboard.scss'
export const UserDashboard = () => {
  const location = useLocation()
  const [enrollment, setEnrollment] = useState<any>()
  const { me } = location.state ?? { me: storage.get('user') };
  const { data: { data: student =[]}, error } = useApi({ service: services.student.students.getAll, params: { scope: 'enrollment', pageSize: 1, 'where[personId]': me?.personId } })
  useMemo(() => {
    if (student.length > 0)
      setEnrollment(student[0]?.enrollment)
  }, [student])
  

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
      {enrollment?.classe ? <ClassColleges classe={enrollment?.classe} /> : null}

    </>
  )
}
