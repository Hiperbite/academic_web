import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../app/api/apiSlice';
import { services } from '../../../../app/api/services';

export const ClassStaffGadgets = ({ staff, refresh }: any) => {

    const [params, setParams] = useState({})
    const [show, setShow] = useState(false);

    const { data: { data } = {}, loading } = useApi({ service: services.academic.curricularPlanItem.getAll, params: { 'where[professorId]': staff?.id } })



    return (<>
        {data ?
            <Row style={{ background: '#EEE' }}>
                <Col>
                    <h4>Minhas Turmas</h4>
                    <Row>
                        {data?.sort((x: any, y: any) => x?.semester > y?.semester ? 1 : -1).map((item: any) =>
                            <ClasseCard planItem={item} />
                        )}
                    </Row>
                </Col>
            </Row > : null}</>
    )
}

const ClasseCard = ({ planItem }: any) => {

    const { data: { data: classes } = {}, loading } = useApi({
        service: services.academic.class.getAll, params: {
            'where[semester]': planItem?.semester,
            'where[courseId]': planItem?.curricularPlan?.id
        }
    })

    return <>{classes?.map((classe: any) => <Col md={3}><Card>
        <Card.Body>
            <Row className="az-list-planItem">
                <Col>
                    <Link to={'/pedagogical/classe/' + classe?.id} className={'absolute-link'} ><i className='fa fa-exclamation-circle'></i></Link><br />
                    <small>{planItem?.discipline?.name}<h4>{classe?.code}</h4></small>
                    <small>{classe?.period?.descriptions}</small>
                </Col>
                <Col className=" text-left">
                    <small>Curso: {classe?.course?.code} - {classe?.course?.name}</small><br />
                    <small>Semestre: {planItem?.semester} º </small><br />
                    <small>{planItem?.grade} º Ano </small>
                </Col>
            </Row>
        </Card.Body>
    </Card></Col>)}</>
}