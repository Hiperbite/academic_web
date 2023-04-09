import React from 'react'
import { Card, Col, Container,Row } from 'react-bootstrap'
import { useDate } from '../../Dashboard/components/useDate'
import { Avatar } from './Avatar/Avatar'

export const UserProfileHeader = ({ me, setRefresh, classe }: any) => {

    const { date, time, wish } = useDate()
    return (
        <div className="az-content  gradiant" style={{ padding: '15px' }} >
            <Container>
                <Col md={2} >
                    {me?.avatar ? <Avatar setRefresh={setRefresh} avatar={me?.avatar} /> : null}
                </Col>
                <Col>
                    <Row>
                        <Col className='align-middle'>
                            <span>#{me?.person?.student?.code}</span>
                            <h3>{me?.person?.firstName} {me?.person?.lastName}</h3>
                            <h6>{me?.email}</h6>
                        </Col>
                        <Col md={3} className='align-middle text-right'>
                            {wish}
                            <h2>{time}</h2>
                            <h5>{date}</h5>
                        </Col>
                    </Row>
                </Col>
            </Container>
            <Container style={{ marginBottom: '-50px', marginTop: '-30px' }}>

                <Col md={2}></Col>
                <Col>

                    <Card className="blur-card" style={{ padding: '5px 30px', border: 'solid 2px rgba(255,255,255,0.5) ' }}>
                        <Row>
                            <Col style={{ borderRight: 'solid 1px #FFF' }}>
                                <span>Turma</span><br />
                                <h4>{classe?.code}</h4>
                            </Col>
                            <Col style={{ borderRight: 'solid 1px #FFF' }}>
                                <span>sala</span><br />
                                <h4>{classe?.classeRoom?.code}</h4>
                            </Col>
                            <Col style={{ borderRight: 'solid 1px #FFF' }}>
                                <span>Ano</span><br />
                                <h4>{classe?.grade}º</h4>
                            </Col>
                            <Col style={{ borderRight: 'solid 1px #FFF' }}>
                                <span>Semestre</span><br />
                                <h4>{classe?.semester}º</h4>
                            </Col>
                            <Col style={{ borderRight: 'solid 1px #FFF' }}>
                                <span>Curso</span><br />
                                <h4>{classe?.course?.name}</h4>
                            </Col>
                            <Col md={1}>

                            </Col>

                        </Row>
                    </Card>
                </Col>

            </Container>

        </div>
    )
}
