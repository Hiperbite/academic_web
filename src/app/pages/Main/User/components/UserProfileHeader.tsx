import React, { useMemo, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import storage from '../../../app/storage'
import { Avatar } from './Avatar/Avatar'

export const UserProfileHeader = ({ me, setRefresh }: any) => {
    return (
        <div className="az-content pd-y-20 pd-lg-y-30 pd-xl-y-40 gradiant" >
            <div className="container">
                <Row>
                    <Col sm={4} >
                        {me?.avatar ? <Avatar setRefresh={setRefresh} avatar={me.avatar} /> : null}
                    </Col>
                    <Col className='align-middle'>
                        <br />
                        <br />
                        <h3>{me?.person?.firstName} {me?.person?.lastName}</h3>
                        <h6>{me?.email}</h6>
                    </Col>
                </Row>

            </div>
        </div>
    )
}
