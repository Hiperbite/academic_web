import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import { Button, Card, Col, FloatingLabel, Form, ListGroup, Modal, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { Api, services } from "../../../app/api/Api"
import { numericString } from "../../../helpers/form.helpers"
import { ModalControls } from "../../Components/Controls"
import { ErrorMessage } from "../../Components/ErrorMessage"

export const StaffDiscipline = ({ staff, refresh }: any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [params, setParams] = useState<any>({ 'where[professorId]': staff?.id })
    useMemo(async () => {
        setLoading(true)
        const { response: { data: response } } = await Api.get({ service: services.academic.curricularPlanItem, params })
        setData(response)
        setLoading(false)
    }, [params])

    return (
        <Row>
            <Col md={8}>
                <h4 className="card-title">Disciplinas</h4>
                <p className="card-text"></p>

                {data?.data?.sort((x: any, y: any) => x?.semester > y?.semester ? 1 : -1).map((item: any) =>
                    <><Card>
                        <Card.Body>

                            <Row className="az-list-item">
                                <Col md={8}>
                                    <span>{item?.discipline?.code}<h6>{item?.discipline?.name}</h6></span>
                                    <p>{item?.discipline?.descriptions}</p>
                                </Col>
                                <Col className="tx-primary text-left">
                                    <span>Curso: {item?.curricularPlan?.course?.code} - {item?.curricularPlan?.course?.name}</span><br />
                                    <span>Ano: {item?.grade} º </span><br />
                                    <span>Semestre: {item?.semester} º </span>

                                </Col>
                            </Row>

                        </Card.Body>

                    </Card>
                        <hr />
                    </>
                )}

            </Col>
            <Col>
                <h4 className="card-title">Habilidades


                    <Button type="button" variant="primaryc" onClick={handleShow}>
                        <i className="fa fa-plus"></i>
                    </Button>
                </h4>
                <p className="card-text"></p>

                <Card>
                    <Card.Body>
                        <StaffHabilities disciplines={staff?.disciplines} refresh={refresh} />
                        <EditDiscipline show={show} refresh={() => {
                            setParams({ ...params, refresh: Math.random() })
                        }} staff={staff} handleClose={handleClose} />
                    </Card.Body>
                </Card>

            </Col>
        </Row>
    )
}

const StaffHabilities = ({ disciplines }: any) => {

    return <>

        <ListGroup variant="flush">
            {disciplines.map((discipline: any) => <ListGroup.Item>{discipline.code} - {discipline.name}</ListGroup.Item>)}
        </ListGroup>
    </>
}

const EditDiscipline = ({ show, handleClose, refresh, staff }: any) => {

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                    <FormEditDiscipline refresh={refresh} staff={staff} handleClose={handleClose} />
                </Modal.Body>

            </Modal>
        </>
    );
}

const FormSchema = z.object({
    discipline: z.string().min(3).max(50).optional().nullable()
});

const FormEditDiscipline = ({ handleClose, discipline, refresh, staff }: any) => {

    const [data, setData] = useState<any>()
    const [disciplines, setDisciplines] = useState<any>()
    const [professors, setProfessors] = useState<any[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const defaultValues = { discipline }
    const { register, handleSubmit, reset,
        formState: { errors }, } = useForm({
            resolver: zodResolver(FormSchema)
        })

    useMemo(async () => {
        const { response: { data: response, status } } = await Api.get({ service: services.academic.discipline, params: { pageSize: 100 } });
        setDisciplines(response?.data)

        reset(defaultValues)
    }, [])

    const handleDelete = async () => {
        setLoading(true)

        /*const { response: { data: response, status } } = await Api.drop({ service: services.academic.curricularPlanItem, id: item?.id })

        if (status === 200) {
            setData(response)
            handleClose()

            toast.success("Disciplina removida com sucesso!")
        } else {
            toast.error("Erro ao registar as Disciplina, por favor tente mais tarde")
        }

        updateParams({ xor: response?.id })

        setLoading(false)*/
    }

    const onSubmit = async (form: any) => {
        setLoading(true)
        const disciplines: any = { add: [form.discipline] }
        alert(JSON.stringify(disciplines))
        let { response: { data: response, status } } = await Api.put({ service: services.staff.staff, id: staff?.id, data: { disciplines } })

        if (status === 200) {
            setData(response)
            handleClose()
            toast.success("Disciplina registado com sucesso!")
        } else {
            toast.error("Erro ao registar aa Disciplina, por favor tente mais tarde")
        }
        refresh({ xor: response?.id })

        setLoading(false)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Disciplina">
                            <Form.Select aria-label="Default select example"
                                {...register("discipline")}
                            >
                                <option value={undefined}>-</option>
                                {disciplines?.map(({ id, code, name }: any) => <option value={id}>{code} - {name}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        {errors.discipline && <ErrorMessage message={errors.discipline?.message} />}
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ModalControls Addon={() => true ? <Button variant='danger' onClick={handleDelete}><i className="fa fa-trash"></i> {" "}Eliminar</Button> : null} handleClose={handleClose} />
                </Col>
            </Row>
        </form>
    )
}
