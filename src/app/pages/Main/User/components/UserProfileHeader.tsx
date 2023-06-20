import React, { useEffect, useMemo, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useDate } from '../../Dashboard/components/useDate'
import { Avatar } from './Avatar/Avatar'
import { AutoEnroll } from './Components/AutoEnroll'
import './UserProfileHeader.scss'
export const UserProfileHeader = ({ me, setRefresh, classe }: any) => {
    const [isSticky, setSticky] = useState(false)
    const { date, time, wish } = useDate()
    /*
        useEffect(() => {
            window.addEventListener('scroll', () => isSticky);
            return () => {
                window.removeEventListener('scroll', isSticky);
            };
        });
    */
    const stickies: any = document.getElementById("gadgets");

    window.onscroll = (e: any) =>
        setTimeout(() => setSticky(window.scrollY > 50), 100)


    return (
        <div className={"gradiant " + (isSticky ? "is-sticky" : '')} id={'UserProfileHeader'}>
            <Container className="az-content" id={'UserProfileHeader'}>
                <Row>
                    <Col md={isSticky ? 1 : 2} >
                        <Avatar setRefresh={setRefresh} avatar={me?.avatar} />
                    </Col>
                    <Col md={isSticky ? 3 : 5} className='align-middle use-data'>
                        <span>#{me?.person?.student?.code}</span>
                        <h3>{me?.person?.firstName} {me?.person?.lastName}</h3>
                        <h6>{me?.email}</h6>
                    </Col>
                    {isSticky ? null : <>
                        <Col md={5} className={'align-middle text-right greetings-data ' + (isSticky ? 'hidden' : '')}>
                            {wish}
                            <h2>{time}</h2>
                            <h5>{date}</h5>

                        </Col>

                        <Col md={2}></Col></>}
                    <Col md={isSticky ? 8 : 10}>

                        <Card id={'gadgets'} className="blur-card gadgets">
                            <Row>
                                <Col >
                                    <span>Turma</span><br />
                                    <h4>{classe?.code}</h4>
                                </Col>
                                <Col >
                                    <span>sala</span><br />
                                    <h4>{classe?.classeRoom?.code}</h4>
                                </Col>
                                <Col >
                                    <span>Ano</span>/<span>Semestre</span><br />
                                    <h4>{classe?.grade}º / {classe?.semester}º</h4>
                                </Col>
                                <Col >
                                    <span>Curso</span><br />
                                    <h4>{classe?.course?.name}</h4>
                                </Col>
                                <Col md={3}>
                                    <AutoEnroll student={me} />
                                </Col>

                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
