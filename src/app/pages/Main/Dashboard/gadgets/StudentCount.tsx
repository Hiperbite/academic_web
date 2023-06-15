import moment from 'moment'
import React from 'react'
import { Button, Card, Col, Row, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../../../app/api/apiSlice'
import { services } from '../../../../app/api/services'

export const StudentCount = () => {

    const {
        data: {
            studentsCount
        } = {
            studentsCount: {
                inActiveEnrollments: 0,
                inActiveEnrollmentsThisYear: 0,
                enrollmentsLastYear: 0,
                enrollments: 0,
                enrollmentsThisyear: 0,
                studets: 0,
                studentsThisYear: 0,
                studentsThisyear: 0
            }
        }, error } = useApi({ service: services.common.dashboards.getStudentCount, params: {} })
    const { data: { canCreateEnrollment, canCreateStudent }={}, error: e } = useApi({ service: services.common.helper.permissions, params: { 'where[permissions]': 'canCreateEnrollment,canCreateStudent' } })
    const navigate = useNavigate();

    const {
        inActiveEnrollments,
        inActiveEnrollmentsThisYear,
        enrollments,
        enrollmentsThisYear,
        enrollmentsLastYear,
        studets,
        studentsThisYear,
        studentsThisyear

    } = studentsCount
    return (
        <Card>
            <Card.Header className="gradiant-primary " style={{ height: '170px' }}>
                <h1 style={{ color: '#FFF' }}>Estudantes</h1>
            </Card.Header>
            <Card.Body>

                <Row className={'row-sm mg-b-20'} style={{ marginTop: '-4em', marginBottom: '-1em' }}>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                Inscritos
                                <h1 style={{ color: '#f7b924' }}>{studets}</h1>
                                <small className="pl-1 pull-right"><i className="fa fa-chevron-down"></i>{studets - studentsThisYear}</small>
                                <Button variant="outline-primary" className='btn-sm'
                                disabled={!canCreateStudent?.success}
                                    onClick={() => navigate('new/step1')}>
                                    <i className='fa fa-plus'></i>{' '}
                                    Registar{' '}
                                    
                                    {canCreateStudent?.success ? <Badge  bg="secondary">{moment(canCreateStudent?.data[0]?.end).fromNow()}</Badge> : <i className="fa fa-lock"></i>}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                Matriculados
                                <h1 style={{ color: '#d92550' }}>{enrollments}</h1>
                                <small className="pl-1 pull-right">{enrollmentsThisYear - enrollmentsLastYear}</small>

                                <Button variant="outline-primary" className='btn-sm text-left'
                                disabled={!canCreateEnrollment?.success}
                                    onClick={() => navigate('register')}>
                                    <i className='fa fa-plus'></i>{' '}
                                    Matricular{ ' '}
                                    
                                    {canCreateEnrollment?.success ? <Badge  bg="secondary">{moment(canCreateEnrollment?.data[0]?.end).fromNow()}</Badge> :  <i className="fa fa-lock"></i>}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                Inativos
                                <h1 style={{ color: '#2651be' }}>{studentsCount?.inActiveEnrollments}</h1>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                Novos estudantes KPI
                                <h1 style={{ color: '#3ac47d' }}>256</h1>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
