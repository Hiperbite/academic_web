import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Modal, ProgressBar } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";

import { useApi } from "../../../../../../app/api/apiSlice";
import { services } from "../../../../../../app/api/services";
import { Api } from "../../../../../app/api/Api";
import { allowed } from "../../../../../app/api/auth/RequireAuth";
import { Autocomplete } from "../../../../../Components/Autocomplete";
import Paginate from "../../../../../Components/Paginate";

export const TabClasseList = ({ period }: any) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[periodId]': period?.id });

    const { data, loading } = useApi({ service: services.academic.class.getAll, params })

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }
    const persent = (classe: any) => ((classe?.enrollmentConfirmations?.length ?? 1) / (classe?.classeRoom?.size ?? 1)) * 100;


    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <h2 className="az-content-title">Turmas</h2>
            <hr className="mg-y-30" />
            <div className="table-responsive">
                <table className="table table-striped mg-b-0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Descricao</th>
                            <th>Sala</th>
                            <th colSpan={3}>vagas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((classe: any) => <tr onClick={() => allowed('CLASS', 1) ? navigate("/pedagogical/classe/" + classe?.id) : null}>
                            <th scope="row">{classe.code}</th>
                            <td>{classe?.descriptions}</td>
                            <td>{classe?.classeRoom?.code ?? '-'}</td>
                            <td>
                                {classe?.enrollments?.length ?? '-'}/
                                {classe?.classeRoom?.size ?? '-'}</td>
                            <td>

                                <ProgressBar now={persent(classe)} label={`${persent(classe)}%`} />
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation">
                <div className="row">
                    <div className="col-md-12">
                        <Paginate pages={data?.pages} updateParams={updateParams} params={params} />
                    </div>
                </div>
            </nav>

        </div>
    </>)
}


const EnrollmentConfirmations = ({ show, handleClose, classe, updateParams }: any) => {

    const [student, setStudent] = useState<any>({})

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
                enrollmentConfirmations: [{
                    classeId: classe.id
                }]
            }
        })

        updateParams({ x: Math.random() })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registar estudante na Turma #{classe?.code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {student?.id ?
                    <Card >
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">{student.code}</Card.Subtitle>
                            <Card.Title>
                                {student?.person?.firstName} {student?.person?.otherName} {student?.person?.lastName}
                            </Card.Title>
                            <Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>
                                        <span style={spanStyles}>Data de Nascimento</span>
                                        <Moment format="DD/MM/YYYY">
                                            {student?.person?.birthDate}
                                        </Moment>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <span style={spanStyles}>Sexo</span>
                                        {student?.person?.gender}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <span style={spanStyles}>EStado civil</span>
                                        {student?.person?.maritalStatus}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Text>
                            <Card.Link href={`/students/show/${student?.id}`}>Ver mais</Card.Link>
                        </Card.Body>
                    </Card> : null}
                <hr />
                <Autocomplete options={data?.data} onChange={onChange} />
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