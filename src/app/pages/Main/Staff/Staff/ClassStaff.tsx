import React, { useState } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useApi } from '../../../../app/api/apiSlice';
import { services } from '../../../../app/api/services';

export const ClassStaff = ({ staff, refresh }: any) => {

    const [params, setParams] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data: { data } = {}, loading } = useApi({ service: services.academic.curricularPlanItem.getAll, params: { 'where[professorId]': staff?.id } })



    return (
        <Row>
            <Col>

                <h4 className="card-title">Turmas</h4>
                <p className="card-text"></p>

                <Row>
                    {data?.sort((x: any, y: any) => x?.semester > y?.semester ? 1 : -1).map((item: any) =>
                        <Col md={3}><Card>
                            <Card.Body>
                                <Row className="az-list-item">
                                    <Col>
                                        <span>{item?.discipline?.name}<h6>{item?.code}</h6></span>
                                        <p>{item?.grade} º Ano </p>
                                    </Col>
                                    <Col className="tx-primary text-left">
                                        <span>Curso: {item?.curricularPlan?.course?.code} - {item?.curricularPlan?.course?.name}</span><br />
                                        <span>Semestre: {item?.semester} º </span><br />
                                        <span>{item?.grade} º Ano </span><br />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        </Col>
                    )}

                </Row>
            </Col>
        </Row >
    )
}
