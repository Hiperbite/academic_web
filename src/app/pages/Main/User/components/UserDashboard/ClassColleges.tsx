import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useApi } from '../../../../../app/api/apiSlice'
import { services } from '../../../../../app/api/services'
import { Loading } from '../../../Components/Snipper/Spinner'
import { Avatar } from '../Avatar/Avatar'

export const ClassColleges = ({ classe }: any) => {

    const [params, setParams] = useState({ 'where[classeId]': classe?.id, 'where[current]': true, scope: 'students' })
    const { data: { data = { data: [] } }={}, loading, error, resolve } = useApi({ service: services.student.enrollment.getAll, params })
    return <Card className="blur-card card card-dashboard-pageviews" id='ClassColleges'>
        <div className="card-header">
            <h4 className="card-title">Colegas da mesma turma {classe?.code}</h4>
        </div>{/* card-header */}
        <div className="card-body">
            {loading ? <Loading loading={true}/> : 
            (data.length > 0 ? data : [])?.map((enrollment: any) => <Row className="az-list-item">
                <Col md={2}>
                    
                    {enrollment?.student?.person?.user?.id ?
                    <Avatar avatar={enrollment?.student?.person?.user?.avatar} canUpdate={false}/> : null }
                    
                </Col>
                <Col className={'text-left'}>
                    <h6>{enrollment?.student?.person?.fullName}</h6>
                
                    <b className="tx-primary">#{enrollment?.code}</b>
                </Col>
            </Row>
            )}
        </div>
    </Card>

}
