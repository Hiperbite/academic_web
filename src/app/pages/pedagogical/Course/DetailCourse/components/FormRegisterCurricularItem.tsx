//import './StudentEnrollment.scss'

import React, { useMemo, useState } from 'react'
import { Form, Col, FloatingLabel, Row, Button } from 'react-bootstrap'
import { Api, services } from '../../../../../app/api/Api'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { ModalControls } from '../../../../Components/Controls'
import { numericString } from '../../../../../helpers/form.helpers';
const FormSchema = z.object({
    disciplineId: z.string().min(3).max(50),
    professorId: z.string().max(50).nullable().optional(),
    semester: numericString(z.number().positive().max(12)),
    descriptions: z.string().optional()
});

export const FormRegisterCurricularItem = ({ updateParams, show, item, handleClose, curricularPlan }: any) => {

    const [data, setData] = useState<any>()
    const [disciplines, setDisciplines] = useState<any>()
    const [professors, setProfessors] = useState<any[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const { disciplineId, semester, descriptions, professorId } = item ?? {}
    const defaultValues = { disciplineId, semester, descriptions, professorId }
    const { register, handleSubmit, reset,
        formState: { errors }, } = useForm({
            resolver: zodResolver(FormSchema)
        })

    useMemo(async () => {
        const { response: { data: response, status } } = await Api.get({ service: services.academic.discipline, params: { pageSize: 100 } });
        setDisciplines(response?.data)

        const { response: { data: professorResponse } } = await Api.get({ service: services.staff.staff, params: { pageSize: 100, 'where[roles]': 'TEACHER' } });
        setProfessors(professorResponse?.data)

        reset(defaultValues)
    }, [])

    const handleDelete = async () => {
        setLoading(true)

        const { response: { data: response, status } } = await Api.drop({ service: services.academic.curricularPlanItem, id: item?.id })

        if (status === 200) {
            setData(response)
            handleClose()

            toast.success("Disciplina removida com sucesso!")
        } else {
            toast.error("Erro ao registar as Disciplina, por favor tente mais tarde")
        }

        updateParams({ xor: response?.id })

        setLoading(false)
    }

    const onSubmit = async (form: any) => {
        setLoading(true)
        form.curricularPlanId = curricularPlan?.id
        form.id = item?.id

        let response: any = {}, status: number = 200;

        if (item?.id) {
            let { response: { data: r, status: s } } = await Api.put({ service: services.academic.curricularPlanItem, data: form })
            response = r
            status = s
        } else {
            let { response: { data: r, status: s } } = await Api.post({ service: services.academic.curricularPlanItem, data: form })
            response = r
            status = s
        }

        if (status === 200) {
            setData(response)
            handleClose()

            toast.success("Disciplina registado com sucesso!")
        } else {
            toast.error("Erro ao registar aa Disciplina, por favor tente mais tarde")
        }
        updateParams({ xor: response?.id })

        setLoading(false)

    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Disciplina">
                            <Form.Select aria-label="Default select example"
                                {...register("disciplineId")}
                            >
                                <option value={undefined}>-</option>
                                {disciplines?.map(({ id, code, name }: any) => <option value={id}>{code} - {name}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        {errors.disciplineId && <ErrorMessage message={errors.disciplineId?.message} />}
                    </Form.Group>
                </Col>                 <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Semestre">
                            <Form.Control type="number" max={14} min={1} {...register("semester")} />
                        </FloatingLabel>
                        {errors.semester &&
                            <ErrorMessage message={errors.semester?.message} />
                        }
                    </Form.Group>
                </Col>

            </Row>
            <Row>

                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Docente">
                            <Form.Select aria-label="Default select example"
                                {...register("professorId")}>
                                <option value={undefined}>-</option>
                                {professors?.map(({ id, code, person, roles }: any) => <option value={id}>{code} - {person.firstName} {person.lastName}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        {errors.professorId && <ErrorMessage message={errors.professorId?.message} />}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Descricao">
                            <Form.Control as="textarea" rows={6} style={{ height: "160px" }} {...register("descriptions")} />
                        </FloatingLabel>
                        {errors.descriptions && <ErrorMessage message={errors.descriptions?.message} />}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalControls Addon={() => item?.id ? <Button variant='danger' onClick={handleDelete}><i className="fa fa-trash"></i> {" "}Eliminar</Button> : null} handleClose={handleClose} />
                </Col>
            </Row>
        </form>
    </>
    )
}
