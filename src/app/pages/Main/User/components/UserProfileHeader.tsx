import React, { useEffect, useMemo, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useDate } from '../../Dashboard/components/useDate'
import { Avatar } from './Avatar/Avatar'
import './UserProfileHeader.scss'
export const UserProfileHeader = ({ me, setRefresh, classe }: any) => {

    const { date, time, wish } = useDate()

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const stickies: any = document.getElementById("gadgets");

    // Get the offset position of the navbar
    const sticky = stickies?.offsetTop;
    /* Method that will fix header after a specific scrollable */
           const isSticky = (e:any) => {
                const header:any = document.getElementById("UserProfileHeader");
                const scrollTop = window.scrollY;
                scrollTop >= 200 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
            };

    return (
        <div className="gradiant" id={'UserProfileHeader'}>
            <Container className="az-content" id={'UserProfileHeader'}>
                <Row>
                    <Col md={2} >
                        {me?.avatar ? <Avatar setRefresh={setRefresh} avatar={me?.avatar} /> : null}
                    </Col>
                    <Col md={5} className='align-middle'>
                        <span>#{me?.person?.student?.code}</span>
                        <h3>{me?.person?.firstName} {me?.person?.lastName}</h3>
                        <h6>{me?.email}</h6>
                    </Col>
                    <Col md={5} className='align-middle text-right'>
                        {wish}
                        <h2>{time}</h2>
                        <h5>{date}</h5>

                    </Col>

                    <Col md={2}></Col>
                    <Col md={10}>

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
                                    <span>Ano</span><br />
                                    <h4>{classe?.grade}º</h4>
                                </Col>
                                <Col >
                                    <span>Semestre</span><br />
                                    <h4>{classe?.semester}º</h4>
                                </Col>
                                <Col >
                                    <span>Curso</span><br />
                                    <h4>{classe?.course?.name}</h4>
                                </Col>
                                <Col md={1}>

                                </Col>

                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
