import React, { useMemo, useState } from 'react'
import { Form, Col, FloatingLabel, Row, Button } from 'react-bootstrap'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import moment from 'moment'
import { numericString } from '../../../../../helpers/form.helpers'
import { Api, services } from '../../../../../app/api/Api'
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { ModalControls } from '../../../../Components/Controls'

const FormSchema = z.object({
    disciplineId: z.string().min(3).max(50),
    weekDay:  numericString(z.number().max(6)),
    startTime: z.string().min(1).max(50),
    duration: numericString(z.number().max(150)),
    descriptions: z.string().optional()
});
const weekDays = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo'
];

const durations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

export const FormScheduleClassRegister = ({ updateParams, show, item, handleClose, classe }: any) => {

    const [data, setData] = useState<any>()
    const [disciplines, setDisciplines] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, reset,
        formState: { errors }, } = useForm({
            resolver: zodResolver(FormSchema)
        })

    useMemo(async () => {
        const { response: { data: response, status } } = await Api.get({
            service: services.academic.curricularPlanItem,
            params: {
                pageSize: 100,
                'where[curricularPlanId]': classe?.course?.id,
                'where[semester]': classe?.semester,
            }
        });
        setDisciplines(response?.data.map((d: any) => d.discipline))

        reset(item)
    }, [])
    const handleDelete = async () => {
        setLoading(true)
        const { response: { data: response, status } } = await Api.drop({ service: services.academic.timeTables, id: item?.id })

        if (status === 200) {
            setData(response)
            handleClose()

            toast.success("Linha de horario removida com sucesso!")
        } else {
            toast.error("Erro ao registar as Disciplina, por favor tente mais tarde")
        }

        updateParams({ xor: response?.id })

        setLoading(false)
    }
    const fixTime = (hours:number,minutes:number)=>`${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`;
    const onSubmit = async (form: any) => {
        setLoading(true)
        form.classeId = classe?.id
        form.id = item?.id
debugger
        let response: any = {}, status: number = 200;

        if (item?.id) {
            let { response: { data: r, status: s } } = await Api.put({ service: services.academic.timeTables, data: form })
            response = r
            status = s
        } else {
            let { response: { data: r, status: s } } = await Api.post({ service: services.academic.timeTables, data: form })
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
                                label="Dia de Semana">
                                <Form.Select {...register("weekDay")} >
                                    <option value={undefined}>-</option>
                                    {weekDays?.map((w: string, i: number) => <option value={i}>{w}</option>)}
                                </Form.Select>
                            </FloatingLabel>
                            {errors.weekDay &&
                                <ErrorMessage message={errors.weekDay?.message} />
                            }
                        </Form.Group>
                    </Col>
                    <Col/>
                    </Row>
                    <Row>

                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Hora">
                                <Form.Select aria-label="Default select example"
                                    {...register("startTime")}
                                >
                                    <option value={undefined}>-</option>
                                    {hours?.map((hour: number) => <>{[0,1,2,3].map((minute:number)=> <option value={`${fixTime(hour,minute*15)}:00`}>{fixTime(hour,minute*15)}</option>)}</>)}
                                </Form.Select>
                            </FloatingLabel>
                            {errors.duration && <ErrorMessage message={errors.duration?.message} />}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Duração">
                                <Form.Select aria-label="Default select example"
                                    {...register("duration")}
                                >
                                    <option value={undefined}>-</option>
                                    {durations?.map((d: number) => <option value={d * 15}>{d * 15} minutos</option>)}
                                </Form.Select>
                            </FloatingLabel>
                            {errors.duration && <ErrorMessage message={errors.duration?.message} />}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Disciplina">
                                <Form.Select {...register("disciplineId")} >
                                    <option value={undefined}>-</option>
                                    {disciplines?.map(({ id, code, name }: any) => <option value={id}>{code} {name}</option>)}
                                </Form.Select>
                            </FloatingLabel>
                            {errors.disciplineId &&
                                <ErrorMessage message={errors.disciplineId?.message} />
                            }
                        </Form.Group>
                    </Col>
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
                        <ModalControls Addon={() => item?.id ? <Button variant='danger' onClick={handleDelete}>Eliminar</Button> : null} handleClose={handleClose} />
                    </Col>
                </Row>
            </form> : <></>
        }
    </>
    )
}


