import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useApi } from '../../../../app/api/apiSlice'
import { services } from '../../../../app/api/services'
import { Avatar } from '../../User/components/Avatar/Avatar'

export const StudentsHonorRoll = () => {

    const { data: { studentHonorRoll } = {} } = useApi({ service: services.common.dashboards.getStudentHonorRoll })
    return (
        <Row>
            {studentHonorRoll?.students.map(({ avatar, firstName, lastName, avareg, classe, period, course, semester }: any) =>
                <Col>
                    <Card >
                        <Avatar avatar={avatar} canUpdate={false} />
                        <Card.Body>
                            <Card.Text>
                                <h6 className="tx-primary">Media: {Number(avareg).toFixed(1)}</h6>
                                <b>{firstName} {lastName}</b>
                                <div style={{fontSize:10}}>
                                    Turma: {classe}, Periodo:{period} Curso: {course} Semestre: {semester} º
                                </div>
                            </Card.Text>
                            <Button variant="primary">Ver perfil</Button>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    )
}
