import React, { useMemo, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import storage from '../../../app/storage'
import { Greatings } from '../../Dashboard/components/Greatings'
import { useDate } from '../../Dashboard/components/useDate'
import { Avatar } from './Avatar/Avatar'

export const UserProfileHeader = ({ me, setRefresh }: any) => {

    const { date, time, wish } = useDate()
    return (
        <div className="az-content pd-y-20 pd-lg-y-30 pd-xl-y-40 gradiant" >
            <Container>
                <Row style={{width:'100%'}}>
                    <Col md={2} >
                         <Avatar setRefresh={setRefresh} avatar={me?.avatar} /> 
                    </Col>
                    <Col className='align-middle'>
                        <br/>
                        <br/>
                        <span>#{me?.person?.student?.code}</span>
                        <h3>{me?.person?.firstName} {me?.person?.lastName}</h3>
                        <h6>{me?.email}</h6>
                    </Col>
                    <Col md={3} className='align-middle text-right'>
                        <br/>
                        <br/>
                    <h2>{time}</h2>
                    <h5>{date}</h5>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}
