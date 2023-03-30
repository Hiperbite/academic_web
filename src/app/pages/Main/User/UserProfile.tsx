import React, { useMemo, useState } from 'react'

import { Link, Outlet } from 'react-router-dom'
import { Api, services } from '../../app/api/Api'
import { Menu } from '../../../layout/Page'
import { UserProfileHeader } from './components/UserProfileHeader'
import { Card, Col, Row } from 'react-bootstrap'
import { ScheduleClass, weekDays } from '../pedagogical/Classe/components/ScheduleClass/ScheduleClass'

export const UserProfile = () => {
  const [me, setMe] = useState<any>()
  const [classe, setClasse] = useState<any>()
  const [refresh, setRefresh] = useState<any>()
  useMemo(async () => {
    const e = JSON.parse(localStorage.getItem('user') ?? '');

    const { response: { data: response } } = await Api.get({ service: '/users', id: e?.id })
    setMe(response)
    const { response: { data: { data: enrollments } } } = await Api.get({ service: services.student.enrollment, params: { 'where[current]': true, 'where[studentId]': response?.person?.student?.id } })
    const classy = enrollments[0].classe
    setClasse(classy)
  }, [refresh])
  return (<>
    <UserProfileHeader me={me} setRefresh={setRefresh} />
    <div className="az-content pd-y-20 pd-lg-y-30 pd-xl-y-40">
      <div className="container">
        <div className="az-content-left az-content-left-components">
          <Menu menu={"me"} data={{ me, classe }} />
        </div>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">

          <Row>
            <Col>
              <Outlet context={[me, classe, refresh, setRefresh]} />
              {me?.person?.student?.id}
              <pre>{JSON.stringify(me, null, 1)}</pre>
            </Col>
            <Col md={3}>

              <Card>
                <Card.Body>
                  Horario
                </Card.Body>
              </Card>
              <hr />
              <Row>
                <Card className="card-dashboard-pageviews">
                  <Card.Header>
                    <Row>
                    <Col>
                    <h6 className="card-title">{weekDays[(new Date()).getDay()-1]}</h6>
                    </Col>
                    <Col className='text-right'>
                      <Link to="./time-tables" state={{classe}}><i className='fa fa-expand'></i></Link>
                    </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    {classe ? <ScheduleClass type='TODAY' classe={classe} /> : null}
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </>
  )
}
