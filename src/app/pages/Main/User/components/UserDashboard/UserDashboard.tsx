import React, { useEffect, useMemo, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useApi } from '../../../../../app/api/apiSlice'
import { services } from '../../../../../app/api/services'
import storage from '../../../../app/storage'
import { Calendar } from '../Calendar/Calendar'
import { HomeUserProfile } from '../HomeUserProfile/HomeUserProfile'
import { ClassColleges } from './ClassColleges'
import './UserDashboard.scss'
export const UserDashboard = () => {
  const location = useLocation()
  const [enrollment, setEnrollment] = useState<any>()
  const { me } = location.state ?? { me: storage.get('user') };
  const { data: { data: student = [] }={}, error } = useApi({ service: services.student.students.getAll, params: { scope: 'enrollment', pageSize: 1, 'where[personId]': me?.personId } })
  useMemo(() => {
    if (student.length > 0)
      setEnrollment(student[0]?.enrollment)
  }, [student])


  return (
    <>
      <Row id="UserDashboard">
        <Col>
          <HomeUserProfile />
        </Col>
        <Col>
          <Card className="blur-card">
            <Calendar />
          </Card>
          {enrollment?.classe ? <ClassColleges classe={enrollment?.classe} /> : null}
        </Col>
      </Row>
      

    </>
  )
}
