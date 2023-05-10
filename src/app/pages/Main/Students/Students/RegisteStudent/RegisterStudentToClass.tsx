


import { Alert, Badge, Button, Card, Col, FloatingLabel, Form, Modal, Row, Table } from 'react-bootstrap'
import { BasicControls } from '../../../../Components/Controls'

import { Autocomplete } from '../../../Components/Autocomplete';
import { useApi } from '../../../../../app/api/apiSlice';
import { services } from '../../../../../app/api/services';
import { useEffect, useState } from 'react';
import { Avatar } from '../../../User/components/Avatar/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { Loading } from '../../../Components/Snipper/Spinner';
import { toast } from 'react-toastify';


export const RegisterStudentToClass = () => {

    const data: any = {};
    const [student, setStudent] = useState<any>()
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [period, setPeriod] = useState<any>()
    const [classe, setClasse] = useState<any>()
    const [semester, setSemester] = useState<any>()
    const { data: enrollment, resolve, loading: enrollmentLoading } =
        useApi({
            service: services.student.enrollment.create
        })
    const { data: fullPeriods } =
        useApi(
            {
                service: services.academic.period.getAll,
                params: { pageSize: 100 }
            }
        )

    const { data: fullStudent } =
        useApi(
            {
                service: services.student.students.getAll,
                id: student?.id ?? '0po',
                params: { pageSize: 1 }
            }
        )
    const onChange = (student: any) => {
        setStudent(student[0])
    }
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const onSubmit = () => {
        debugger
        resolve({ form: { studentId: student?.id, classeId: classe?.id } })
    }
    useEffect(() => {
        if (enrollment?.id) {
            toast.success('Estudante Matriculado com Sucesso sob Numero: ' + enrollment?.code);
            setStudent(null)
            setPeriod(null)
            setClasse(null)
            setSemester(null)
        }
    }, [enrollment, enrollmentLoading])
    return (<>
        <br />{' '}
        <br />{' '}
        <br />{' '}
        <h1>Matricular estudante</h1>
       <div> <br />{' '}
        <br />{' '}
        </div>
        <form >
            <h4>

                1- Selecione o Estudante ou candidato {' '}
                {student
                    ? <i className='fa fa-check-circle' style={{ fontSize: 24, color: '#0a0' }}></i>
                    : null}
            </h4>
            <Row>
                <Col md={8}>
                    {student ?
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        {student
                                            ? <Avatar
                                                canUpdate={false}
                                                avatar={student?.person?.user?.avatar}
                                                user={student?.person?.user} />
                                            : null}

                                    </Col>
                                    <Col>
                                        <i className='fa fa-times pull-right' onClick={() => setStudent(null)}></i>
                                        {student?.code ? <Badge bg="primary">
                                            Estudante Matriculado
                                        </Badge> :
                                            <Badge bg="secondary">
                                                Candidato
                                            </Badge>}<br />
                                        <span>Número:</span>
                                        <h6>#{student?.code ?? student?.entryCode}</h6>

                                        <span>Nome completo:</span>
                                        <h6>{student?.person?.fullName}</h6>
                                        <span>{student?.person?.idcard?.type}</span>
                                        <h6>{student?.person?.idcard?.type}</h6>
                                        <h6>{student?.person?.idcard?.number}</h6>
                                        <h6>{student?.person?.idcard?.validationDate}</h6>

                                        <span>{student?.code ?
                                            <Alert key={'secondary'} variant={'secondary'}>
                                                <b>Turma: </b>{fullStudent?.enrollment?.classe?.code} {', '}
                                                <b>Curso: </b>{fullStudent?.enrollment?.classe?.course?.name}{', '}
                                                <b>Periodo: </b>{fullStudent?.enrollment?.classe?.period?.name}{' '}
                                                <Link className='pull-right' to={'/pedagogical/classe/' + fullStudent?.enrollment?.classe?.id}><i className='fa fa-chevron-right'></i></Link>
                                            </Alert> : 'Candidadto'}</span>
                                        <Link to={'/students/show/' + student?.id}>
                                            <Button variant='secondary' className='pull-right'> Ver mais</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card> :
                        <Autocomplete options={data?.data} onChange={onChange} />
                    }
                </Col>
                <Col>

                </Col>
            </Row>

            {student ? <><hr />
                <Col md={12}>
                    <h4>2 - Selecione o Periodo e o Semestre a matricular {' '}
                        {period && semester
                            ? <i className='fa fa-check-circle' style={{ fontSize: 24, color: '#0a0' }}></i>
                            : null}
                    </h4>
                </Col>
                <Row>
                    <Col md={8}>
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Semestre">
                                    <Form.Select aria-label="Default select example"
                                        onChange={(e: any) => setSemester(e.target.value)}
                                    >
                                        <option disabled selected></option>
                                        {semesters.map((i: number) => <option>{i}</option>)}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Periodo">
                                    <Form.Select aria-label="Default select example"
                                        onChange={(e: any) => setPeriod(e.target.value)}
                                    >
                                        <option disabled selected></option>
                                        {fullPeriods?.map(({ id, code, descriptions }: any) =>
                                            <option value={id}>{code} - {descriptions}</option>)}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </> : null}
            <hr />
            {period && semester ? <>
                <Col md={12}>
                    <h3>3 - Selecione o Turma a matricular {' '}
                        {classe
                            ? <i className='fa fa-check-circle' style={{ fontSize: 24, color: '#0a0' }}></i>
                            : null}
                    </h3>
                </Col>
                <Row>
                    <Col md={12}>
                        <br />
                        <ClassTableSelector selectedClass={classe} semester={semester} period={period} setClasse={setClasse} />
                    </Col>
                </Row>
            </> : null}
            {classe ? <BasicControls onSubmit={() => setShowConfirmation(true)} /> : null}

        </form>
        <ConfirmModal
            enrollment={enrollment}
            loading={enrollmentLoading}
            show={showConfirmation}
            handleShow={() => setShowConfirmation(!showConfirmation)}
            student={student}
            classe={classe}
            onSubmit={onSubmit} />
    </>
    )
}


const ClassTableSelector = ({ semester, period, setClasse, selectedClass }: any) => {

    useEffect(() => setClasse(null), [semester, period])
    const { data: { data: classes } = {}, loading } = useApi({ service: services.academic.class.getAll, params: { 'where[semester]': semester, 'where[periodId]': period } })
    return <Card><Card.Body><Table striped hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Ano</th>
                <th>Semestre</th>
                <th>Periodo</th>
                <th>Curso</th>
                <th>Vagas</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {classes?.map((classe: any) =>
                loading ? <tr><td colSpan={7}>
                    <Loading loading={true} /></td></tr> :
                    <tr>
                        <td>#{classe?.code}</td>
                        <td>{classe?.grade}</td>
                        <td>{classe?.semester}</td>
                        <td>{classe?.period?.descriptions}</td>
                        <td>{classe?.course?.code} - {classe?.course?.name}</td>
                        <td>{classe?.enrollments?.length} / {classe?.classeRoom?.size} </td>

                        <th> <Button onClick={() => setClasse(classe)} variant={classe?.id === selectedClass?.id ? 'success' : 'outline'}> selecionar</Button></th>
                    </tr>
            )}
        </tbody>
    </Table></Card.Body></Card>
}


const ConfirmModal = ({ loading, show, handleShow, student, classe, onSubmit, enrollment }: any) => {

    const navigate = useNavigate();
    const ModalBodySuccess = () => <Modal.Body>
        <Row>
            <Col className='text-center'>
                <br />
                <br />
                <br />
                <h1>
                    <i className='fa fa-check-circle' style={{ color: '#0A0', fontSize: 64 }}></i>
                </h1>
                <h3>{student?.code ? '' : 'Confrimação de '}Matricula feita com sucesso</h3>
                <br />
                <br />
                <br />
                <Button variant='secondary' onClick={handleShow}>Fechar</Button>
                <br />
                <br />
                <br />
            </Col>
        </Row>
    </Modal.Body>

    const ModalBodyConfirm = () => <>
        <Modal.Header closeButton>
            <Modal.Title>{enrollment?.id ? 'Registo feito com sucesso' : 'Confirmar dados'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2>Estudante</h2>
            <Row>
                <Col md={4}>
                    {student
                        ? <Avatar
                            canUpdate={false}
                            avatar={student?.person?.user?.avatar}
                            user={student?.person?.user} />
                        : null}

                </Col>
                <Col>
                    <span>Número:</span>
                    <h6>#{student?.code ?? student?.entryCode}</h6>
                    <span>Nome completo:</span>
                    <h6>{student?.person?.fullName}</h6>
                    <span>{student?.person?.idcard?.type}</span>
                    <h6>{student?.person?.idcard?.type}</h6>
                    <h6>{student?.person?.idcard?.number}</h6>
                    <h6>{student?.person?.idcard?.validationDate}</h6>
                    <Link to={'/students/show/' + student?.id}>
                        <Button variant='secondary' className='pull-right'> Ver mais</Button>
                    </Link>
                </Col>
            </Row>
            <hr />

            <h2>Turma</h2>
            <Row>
                <Col md={12}>
                    <span>Turma</span><h4>#{classe?.code}</h4>
                </Col>
                <Col md={6}>
                    <span>Ano e Semestre</span>
                    <h6>{classe?.grade}º / {classe?.semester}º</h6>
                </Col>
                <Col md={6}>
                    <span>Periodo</span>
                    <h6>{classe?.period?.descriptions}</h6>
                </Col>
                <Col md={6}><span>Curso</span>
                    <h6>{classe?.course?.code} - {classe?.course?.name}</h6></Col>
                <Col md={6}><span>Vagas</span>
                    <h6>{classe?.enrollments?.length} / {classe?.classeRoom?.size} </h6></Col>
                <h6> <Button variant='outline'> selecionar</Button></h6>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={onSubmit}>
                <i className='fa fa-save'></i>{' '}Confirmar e Registar
            </Button>
        </Modal.Footer>
    </>

    return (
        <>

            <Modal show={show} onHide={handleShow}>
                {loading ? <Loading loading={loading} /> :
                    enrollment?.id
                        ? <ModalBodySuccess />
                        : <ModalBodyConfirm />}
            </Modal>
        </>
    );
}