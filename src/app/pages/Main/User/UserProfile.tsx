import React, { useContext, useMemo, useState } from 'react'
import './UserProfile.scss'
import { Link, Outlet } from 'react-router-dom'
import { Api, services } from '../../app/api/Api'
import { Menu } from '../../../layout/Page'
import { UserProfileHeader } from './components/UserProfileHeader'
import { Card, Col, Row } from 'react-bootstrap'
import { ScheduleClass, weekDays } from '../pedagogical/Classe/components/ScheduleClass/ScheduleClass'
import { AuthContext } from '../../../../App'

export const UserProfile = () => {
    const { user }: any = useContext(AuthContext);
  const [me, setMe] = useState<any>()
  const [classe, setClasse] = useState<any>()
  const [refresh, setRefresh] = useState<any>()
  useMemo(async () => {
    


    const { response: { data: response } } = await Api.get({ service: '/users', id: user?.id })
    setMe(response)
    const { response: { data: { data: [enrollment] } } } = await Api.get({ service: services.student.enrollment, params: { scope : 'full','where[current]': true, 'where[studentId]': response?.person?.student?.id } })
    const classy = enrollment?.classe
    setClasse(classy)
  }, [refresh])
  return (<>
    <UserProfileHeader me={me} setRefresh={setRefresh} classe={classe} />
    <div className="az-content pd-y-20 pd-lg-y-30 pd-xl-y-40">
      <div className="container">
        <div className="az-content-left az-content-left-components">
          <Menu menu={"me"} data={{ me, classe }} />
        </div>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
          <Row>
            <Col>
              <Outlet context={[me, classe, refresh, setRefresh]} />
            </Col>
            <Col md={3}>
              <Row>
                <Card className="card-dashboard-pageviews">
                  <Card.Header>
                    <Row>
                      <Col>
                        <h6 className="card-title">{weekDays[(new Date()).getDay() - 1]}</h6>
                      </Col>
                      <Col className='text-right'>
                        <Link to="./time-tables" state={{ classe }}><i className='fa fa-expand'></i></Link>
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
