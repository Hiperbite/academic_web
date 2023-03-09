import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import useAxiosFetch, { Api, services } from "../../../../../app/api/Api";
import { Autocomplete } from "../../../../Components/Autocomplete";
import Paginate from "../../../../Components/Paginate";

export const TabStudentCourseList = ({ course, classe }: any) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[current]': 1 });
    const { data, loading, isError } = useAxiosFetch(services.student.enrollment, params)


    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }
    useMemo(() => {
        updateParams({ 'where[classeId]': course?.classes.map((x: any) => x.id) })
    }, [course?.classes])
    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <h2 className="az-content-title">Estudantes</h2>

            <div className='row'>
                <div className='col-md-6'>
                </div>
                <div className='col-md-6 text-right'>

                </div>
            </div>

            <hr className="mg-y-30" />
            <div className="table-responsive">
                <table className="table table-striped table-hover mg-b-0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nome</th>
                            <th>Turma</th>
                            <th>Ano</th>
                            <th className="text-right">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((enrollment: any) => <tr onClick={() => navigate("/students/show/" + enrollment?.enrollment?.student?.id)}>
                            <th scope="row">{enrollment?.enrollment?.person?.user?.avatar}</th>
                            <th scope="row">{enrollment?.enrollment?.code}</th>
                            <td>
                                {enrollment?.enrollment?.student?.person?.fullName}
                            </td>
                            <td>{enrollment?.classe?.code}</td>
                            <td>{enrollment?.classe?.grade}º</td>
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
            <EnrollmentConfirmations show={show}  handleClose={handleClose} classe={classe} updateParams={updateParams} />
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