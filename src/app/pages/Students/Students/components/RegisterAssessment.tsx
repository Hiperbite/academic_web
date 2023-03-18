import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { Api, services } from '../../../../app/api/Api';
import { floatString, numericString } from '../../../../helpers/form.helpers';
import { ModalControls } from '../../../Components/Controls';
import { ErrorMessage } from '../../../Components/ErrorMessage';

export const RegisterAssessment = ({ show, handleClose, refresh, staff, assessment, disciplines, assessmentTypes }: any) => {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormEditAssessment 
                    assessment={assessment}
                    refresh={refresh}
                    staff={staff}
                    disciplines={disciplines}
                    assessmentTypes={assessmentTypes}
                    handleClose={handleClose} />
                </Modal.Body>

            </Modal>
        </>
    );
}

const FormSchema = z.object({
    id: z.string().optional(),
    value: floatString(z.number().min(0).max(20)),
    semester: numericString(z.number()),
    enrollmentId: z.string(),
    staffId: z.string().optional(),
    classeId: z.string().uuid().optional(),
    disciplineId: z.string().uuid().optional(),
    typeId: z.string().uuid().optional()
});

const FormEditAssessment = ({ handleClose, assessment, refresh, staff, disciplines, assessmentTypes }: any) => {

    const [data, setData] = useState<any>()
    const [assessments, setAssessments] = useState<any>()
    const [professors, setProfessors] = useState<any[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const defaultValues = assessment
    const { register, handleSubmit, reset,
        formState: { errors }, } = useForm({
            defaultValues,
            resolver: zodResolver(FormSchema)
        })
    useMemo(() => {
        reset(assessment)
    }, [])
    useMemo(async () => {
        const { response: { data: response, status } } = await Api.get({ service: services.common.assessments, params: { pageSize: 100 } });
        setAssessments(response?.data)
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
        let { response: { data: response, status } } = await Api[form?.id ? 'put' : 'post']({ service: services.common.assessments, id: form?.id, data: form })

        if (status === 200) {
            setData(response)
            handleClose()
            toast.success("Nota registado com sucesso!")
        } else {
            toast.error("Erro ao registar aa Disciplina, por favor tente mais tarde")
        }
        refresh({ xor: Math.random() })

        setLoading(false)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col md={8}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Nota"
                            className="mb-3">
                            <Form.Control type="number" step={0.01} min={0} {...register("value")} style={{ textAlign: 'right' }} />
                        </FloatingLabel>
                        {errors.value && <ErrorMessage message={errors.value?.message} />}
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Semestre"
                            className="mb-3">
                            <Form.Control type="number" {...register("semester")} style={{ textAlign: 'right' }} />
                        </FloatingLabel>
                        {errors.semester && <ErrorMessage message={errors.semester?.message} />}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Disciplina">
                            <Form.Select aria-label="Default select example"
                                {...register("disciplineId")}>
                                <option value={undefined}>-</option>
                                {disciplines?.map(({ id, code, name }: any) => <option value={id}>{code} - {name}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        {errors.disciplineId && <ErrorMessage message={errors.disciplineId?.message} />}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Tipo de exames">
                            <Form.Select aria-label="Default select example"
                                {...register("typeId")}
                            >
                                <option value={undefined}>-</option>
                                {assessmentTypes?.map(({ id, code, name }: any) => <option value={id}>{code} - {name}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        {errors.typeId && <ErrorMessage message={errors.typeId?.message} />}
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ModalControls Addon={() => assessment?.id ? <Button variant='danger' onClick={handleDelete}><i className="fa fa-trash"></i> {" "}Eliminar</Button> : null} handleClose={handleClose} />
                </Col>
            </Row>
        </form>
    )
}
