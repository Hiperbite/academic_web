import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Image, ListGroup, Modal, Row } from "react-bootstrap";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import useAxiosFetch, { Api, services } from "../../../../../app/api/Api";
import { Autocomplete } from "../../../../Components/Autocomplete";
import Paginate from "../../../../Components/Paginate";

export const TabStudentClasseList = ({ classe }: any) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[classeId]': classe?.id, 'where[current]': 1 });
    const { data, loading, isError } = useAxiosFetch(services.student.enrollment, params)

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }

    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">

            <div className='row'>
                <div className='col-md-6'>
                    <h2 className="az-content-title">Estudantes</h2>
                </div>
                <div className='col-md-6 text-right'>
                    <Button
                        variant="primary"
                        disabled={loading}
                        onClick={handleShow}
                    >
                        {loading ? 'Loading…' : 'Registar'}
                    </Button>
                </div>
            </div>

            <hr className="mg-y-30" />
            <div className="table-responsive">
                <table className="table table-striped table-hover mg-b-0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nome</th>
                            <th>Sexo</th>
                            <th></th>
                            <th className="text-right">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((enrollment: any) => <tr onClick={() => navigate("/students/show/" + enrollment?.student?.id)}>
                            <th scope="row">{enrollment?.student?.code}</th>
                            <td>
                                {enrollment?.student?.person?.fullName}
                            </td>
                            <td>
                                {enrollment?.student?.person?.gender}
                            </td>
                            <td>
                                {enrollment?.student?.person?.yearsOld}
                            </td>
                            <td></td>
                            <td className="text-right">

                                <Moment format="DD/MM/YYYY">
                                    {enrollment?.createdAt}
                                </Moment>
                            </td>
                            <td>

                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={data} />
            <EnrollmentConfirmations show={show} handleClose={handleClose} classe={classe} updateParams={updateParams} />
        </div>
    </>)
}


const EnrollmentConfirmations = ({ show, handleClose, classe, updateParams }: any) => {

    const [student, setStudent] = useState<any>()

    const data = { data: [] }
    const spanStyles = {
        'display': 'block',
        'color': '#999',
        'fontSize': '12px'
    }
    const onChange = (v: any) => {
        setStudent(v[0]);
    }

    const registeEnrollment = async () => {
        const final = await Api.post({
            service: services.student.enrollment, data:
            {
                studentId: student.id,
                classeId: classe.id
            }
        })

        updateParams({ x: Math.random() })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Registar estudante na Turma #{classe?.code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {student ?
                    <Row><Row><Col><Badge onClick={() => setStudent(null)} className="pull-right"><i className="fa fa-times"></i></Badge></Col></Row>
                    <Col md={4}>
                        
                        <Image thumbnail src={student?.person?.user?.avatar ?? '/logo192.png'} />
</Col>
<Col>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>

                            {student?.code ?? student?.entryCode }
                            <h5>{student?.person?.fullName}</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <span style={spanStyles}>Data de Nascimento</span>
                                        <Moment format="DD/MM/YYYY">
                                            {student?.person?.birthDate}
                                        </Moment>
                                        <span style={spanStyles}>Idade</span>
                                        {student?.person?.yearsOld} anos
                                
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><span style={spanStyles}>EStado civil</span>
                                        {student?.person?.maritalStatus}</Col>
                                    <Col>
                                        <span style={spanStyles}>Sexo</span>
                                        {student?.person?.gender}</Col>
                                </Row>

                            </ListGroup.Item>
                        </ListGroup>

                        <Link to={`/students/show/${student?.id}`}>Ver mais</Link>
                    </Col>
                    </Row> :
                    <Autocomplete options={data?.data} onChange={onChange} />
                }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => registeEnrollment()}>
                    Registar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}