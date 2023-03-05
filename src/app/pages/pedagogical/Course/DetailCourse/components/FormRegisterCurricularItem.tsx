//import './StudentEnrollment.scss'

import React, { useMemo, useState } from 'react'
import { Form, Col, FloatingLabel, Row, Button } from 'react-bootstrap'
import { Api, services } from '../../../../../app/api/Api'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { BasicControls, ModalControls } from '../../../../Components/Controls'

const FormSchema = z.object({
    disciplineId: z.string().min(3).max(50),
    semester: z.string().max(2),
    descriptions: z.string().optional()
});

export const FormRegisterCurricularItem = ({ updateParams, show, item, handleClose, curricularPlan }: any) => {

    const [data, setData] = useState<any>()
    const [disciplines, setDisciplines] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const { disciplineId, semester, descriptions } = item ?? {}
    const defaultValues = { disciplineId, semester, descriptions }
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
alert(1)
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
        {data?.id == null ?
            <form onSubmit={handleSubmit(onSubmit)} >
                <Row>
                    <Col>
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
                        </Form.Group></Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Descricao">
                                <Form.Control as="textarea" rows={6} {...register("descriptions")} />
                            </FloatingLabel>
                            {errors.descriptions && <ErrorMessage message={errors.descriptions?.message} />}
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ModalControls Addon={()=>item?.id ? <Button variant='danger' onClick={handleDelete}>Eliminar</Button>:null} handleClose={handleClose} />
                    </Col>
                </Row>
            </form> : <></>}
    </>
    )
}


