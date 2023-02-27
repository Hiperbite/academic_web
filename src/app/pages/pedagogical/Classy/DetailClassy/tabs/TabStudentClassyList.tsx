import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import useAxiosFetch, { Api, services } from "../../../../../app/api/Api";
import { Autocomplete } from "../../../../Components/Autocomplete";
import Paginate from "../../../../Components/Paginate";

export const TabStudentClassyList = ({ classy }: any) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 2, page: 1, 'where[classyId]': classy?.id });
    const { data, loading, isError } = useAxiosFetch(services.student.enrollmentConfirmations, params)

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }

    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <h2 className="az-content-title">Estudantes</h2>
            
            <div className='row'>
                <div className='col-md-6'>

                    <div className="az-content-label mg-b-5 hidden">Simple Table</div>
                    <p className="mg-b-20 hidden">Using the most basic table markup.</p>

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
                <table className="table table-striped mg-b-0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nome</th>
                            <th></th>
                            <th className="text-right">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((enrollment: any) => <tr onClick={() => navigate("/students/show/" + enrollment?.enrollment?.student?.id)}>
                            <th scope="row">{enrollment?.enrollment?.code}</th>
                            <td>
                                {enrollment?.enrollment?.student?.person?.firstName}  {enrollment?.enrollment?.student?.person?.otherName}  {enrollment?.enrollment?.student?.person?.lastName}
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
            <Paginate pages={data?.pages} updateParams={updateParams} params={data} />
            <EnrollmentConfirmations show={show} handleClose={handleClose} classy={classy} updateParams={updateParams} />
        </div>
    </>)
}


const EnrollmentConfirmations = ({ show, handleClose, classy, updateParams }: any) => {

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
                    classyId: classy.id
                }]
            }
        })

        updateParams({ x: Math.random() })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registar estudante na Turma #{classy?.code}</Modal.Title>
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