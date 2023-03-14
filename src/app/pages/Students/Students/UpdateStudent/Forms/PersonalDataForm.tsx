import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { saveData, savePerson } from '../rootSlice'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { BasicControls, Controls } from '../../../../Components/Controls'
//import { chooseBase } from './rootSlice'

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { Api, services } from '../../../../../app/api/Api'
import { toast } from 'react-toastify'
import DatePicker from 'react-date-picker'
import moment from 'moment'
const FormSchema = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    otherNames: z.string().max(20).optional().nullable(),
    gender: z.string(),
    nationality: z.string(),
    maritalStatus: z.string(),
    birthDate: z.date().max((new Date(new Date().setFullYear(new Date().getFullYear() - 10))), { message: "Too young!" })

});
export const PersonalDataForm = ({ student }: any) => {
    student.person.birthDate=moment(student.person.birthDate).toDate()
    const navigate = useNavigate()
    const data = useSelector((state: any) => state.person)
    const { register, reset, handleSubmit, control,
        formState: { errors }, } = useForm({
            defaultValues: { ...student.person, ...data },
            resolver: zodResolver(FormSchema)
        })

    useMemo(() => reset(student.person), [reset, student.person])

    const onSubmit = async (form: any) => {
        const { response: { data: response, status } }  = await Api.put({ service: services.common.persons, data: { ...form, id: student?.person?.id } })
        if (status === 200) {
            toast.success('Dados Pessoais actualizados com sucesso');
        }
        else {
            toast.error('Não foi possive registar, por favor tente masi tarde');
        }

        navigate('/students/show/' + student?.id);

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Primeiro Nome">
                            <Form.Control type="text" value={data?.firstName} {...register("firstName")} />
                        </FloatingLabel>
                        {errors.firstName &&
                            <ErrorMessage message={errors.firstName?.message} />
                        }
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Último Nome">
                            <Form.Control type="text" value={data?.lastName} {...register("lastName")} />
                        </FloatingLabel>
                        {errors.lastName &&
                            <ErrorMessage message={errors.lastName?.message} />
                        }
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Outros Nome">
                            <Form.Control type="text" value={data?.otherNames}   {...register("otherNames")} />
                        </FloatingLabel>
                        {errors.otherNames && <ErrorMessage message={errors.otherNames?.message} />}
                    </Form.Group>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Genero</Form.Label>
                        <div key={`inline-radio`}>
                            <Form.Check
                                inline
                                value={"M"}
                                label="Masculino"
                                {...register("gender")}
                                type="radio"
                                id={`inline-radio-1`} />
                            <Form.Check
                                inline
                                value={"F"}
                                label="Feminino"
                                {...register("gender")}

                                type="radio"
                                id={`inline-radio-2`}
                            />
                        </div>

                        {errors.gender &&
                            <ErrorMessage message={errors.gender?.message} />
                        }
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Data de Nascimento">
                                 <Controller
                                    render={({
                                        field: { onChange, onBlur, value, name, ref },
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => <DatePicker
                                            maxDate={(new Date(new Date().setFullYear(new Date().getFullYear() - 16)))}
                                            clearIcon={null} format="dd/MM/yyyy" className="form-control" onChange={onChange} value={value ? moment(value).toDate() : null} />}
                                    control={control}
                                    {...register("birthDate")}
                                />
                            
                        </FloatingLabel>
                        {errors.birthDate && <ErrorMessage message={errors.birthDate?.message} />}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Nacionalidade">
                            <Form.Select aria-label="Default select example"
                                {...register("nationality")}
                            >
                                <option value="AO">Angola</option>
                                <option value="NL">Holanda</option>
                                <option value="PT">Portugal</option>
                            </Form.Select>
                        </FloatingLabel>
                        {errors.nationality && <ErrorMessage message={errors.nationality?.message} />}
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Estado Civil">
                            <Form.Select aria-label="Default select example"
                                {...register("maritalStatus")}
                            >
                                <option value="SINGLE">Solteiro</option>
                                <option value="MARRIED">Casado</option>
                                <option value="DIVORCE">Divorciado</option>
                                <option value="WIDOW">Viuvo</option>
                                <option value="SEPARED">Separado</option>
                            </Form.Select>
                        </FloatingLabel>
                        {errors.maritalStatus && <ErrorMessage message={errors.maritalStatus?.message} />}
                    </Form.Group>

                </Col>
            </Row>
            <BasicControls />
        </form>
    )
}
