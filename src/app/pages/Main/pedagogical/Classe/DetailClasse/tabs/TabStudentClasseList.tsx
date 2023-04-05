import { useState } from "react";
import { Badge, Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import useAxiosFetch, { Api, services } from "../../../../../../app/api/Api";
import { AllowedFor } from "../../../../../app/api/auth/RequireAuth";
import { Autocomplete } from "../../../../../Components/Autocomplete";
import Paginate from "../../../../../Components/Paginate";
import { ListTableStudentEnrollment } from "../../../../Students/Students/components/ListTableStudentEnrollment";

export const TabStudentClasseList = ({ classe }: any) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, scope: 'students', page: 1, 'where[classeId]': classe?.id, 'where[current]': 1 });
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
                    <AllowedFor role={'CLASS'} level={3}>
                        <Button
                            variant="primary"
                            disabled={loading}
                            onClick={handleShow}
                        >
                            {loading ? 'Loading…' : 'Registar Estudante'}
                        </Button>
                    </AllowedFor>
                </div>
            </div>

            <div className="table-responsive">

                {data?.data ? <ListTableStudentEnrollment enrollments={data?.data} /> : null}
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
        <Modal show={show} size={"lg"} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Registar estudante na Turma #{classe?.code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {student ?
                    <Row><Row><Col>
                        <button onClick={() => setStudent(null)} type="button" className="btn-close pull-right" aria-label="Close"></button>
                    </Col></Row>

                        <Col md={4} className="img-thumbnail image" style={{ minHeight: "300px", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${student?.person?.user?.avatar ?? '/logo192.png'})` }}>

                        </Col>
                        <Col>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>

                                    <h4>{student?.code ?? student?.entryCode}</h4>
                                    <h3>{student?.person?.fullName}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {student?.isActive
                                        ? <Badge pill bg="success">Activo</Badge>
                                        : <Badge pill bg="danger">Suspenco</Badge>}

                                    {student?.code
                                        ? <Badge pill bg="primary">Estudante</Badge>
                                        : <Badge pill bg="warning">Candidato</Badge>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <span style={spanStyles}>Data de Nascimento</span>
                                            <Moment format="DD/MM/YYYY">
                                                {student?.person?.birthDate}
                                            </Moment>
                                        </Col>
                                        <Col>
                                            <span style={spanStyles}>Idade</span>
                                            {student?.person?.yearsOld} anos
                                        </Col>
                                    </Row>

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
                                <ListGroup.Item>
                                    <Link to={`/students/show/${student?.id}`} className={"badge rounded-pill bg-secondary"}>Ver mais</Link>
                                </ListGroup.Item>
                            </ListGroup>


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