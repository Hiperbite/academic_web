//import './StudentEnrollment.scss'

import React, { useMemo, useState } from 'react'
import { Form, Col, FloatingLabel, Row, Button } from 'react-bootstrap'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { ErrorMessage } from '../../../../../Components/ErrorMessage'
import { ModalControls } from '../../../../../Components/Controls'
import { numericString } from '../../../../../../helpers/form.helpers';
import { useApi } from '../../../../../../app/api/apiSlice'
import { services } from '../../../../../../app/api/services'
import { Loading } from '../../../../Components/Snipper/Spinner'
const FormSchema = z.object({
    disciplineId: z.string().min(3).max(50),
    professorId: z.string().max(50).nullable().optional(),
    semester: numericString(z.number().positive().max(12)),
    descriptions: z.string().optional(),
    //curricularPlanId: z.string().optional(),
});

export const FormRegisterCurricularItem = ({ updateParams, show, item, handleClose, curricularPlan }: any) => {

    const [loading, setLoading] = useState<boolean>(false)
    const { disciplineId, semester, descriptions, professorId } = item ?? {}
    const defaultValues = { disciplineId, semester, descriptions, professorId, curricularPlanId: curricularPlan?.id }
    const { register, handleSubmit, reset,
        formState: { errors }, } = useForm({
            resolver: zodResolver(FormSchema)
        })


    const { data: { data: disciplines } = {}, loading: loadingDisciplines } = useApi({ service: services.academic.discipline.getAll, params: { pageSize: 100, 'order[name]': 'ASC' } });
    const { data: { data: professors } = {}, loading: loadingProfessors } = useApi({ service: services.staff.staff.get, params: { pageSize: 100, 'where[roles]': 'TEACHER' } });
    const { data: dataCreatedPlan, error, resolve, loading: loadingCreatePlan } = useApi({ service: services.academic.curricularPlanItem[item?.id ? 'update' : 'create'] })
    const { resolve: deleteCreatePlanResolve, data: deletedPlanData, loading: loadingDeleteCreatePlan } = useApi({ service: services.academic.curricularPlanItem.delete })

    useMemo(async () => { reset(defaultValues) }, [])
    useMemo(async () => {
        setLoading(
            loadingDisciplines
            || loadingProfessors
            || loadingCreatePlan
            || loadingDeleteCreatePlan
        )
    }, [loadingDisciplines, loadingProfessors, loadingCreatePlan, loadingDeleteCreatePlan])

    useMemo(() => {
        if (deletedPlanData) {
            toast.success("Linha de plano curricular removido com sucesso!")
            updateParams({ xor: deletedPlanData })
            handleClose()
        } else if (dataCreatedPlan?.id && item?.id) {
            toast.success("Linha de plano curricular actualizado com sucesso!")
            updateParams({ xor: dataCreatedPlan?.id })
            handleClose()
        } else if (dataCreatedPlan?.id) {
            toast.success("Linha de plano curricular registado com sucesso!")
            updateParams({ xor: dataCreatedPlan?.id })
            handleClose()
        } else if (error) {
            toast.error("Erro ao tratar a Linha de plano curricular, por favor tente mais tarde")
        }
    }, [dataCreatedPlan, deletedPlanData, error, handleClose])

    const onSubmit = (form: any) =>
        resolve({ form: { ...form, id: item?.id, curricularPlanId: curricularPlan?.id } })

    const handleDelete = () =>
        deleteCreatePlanResolve(item)

    return (<>
        {loading ? <Loading loading={true} /> :
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
        }
    </>
    )
}
