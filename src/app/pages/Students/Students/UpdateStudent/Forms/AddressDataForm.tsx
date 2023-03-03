import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { saveData, savePerson } from '../rootSlice'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { BasicControls, Controls } from '../../../../Components/Controls'
//import { chooseBase } from './rootSlice'

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { Api, services } from '../../../../../app/api/Api'
const FormSchema = z.object({
    birthPlaceAddres: z.object({
        address: z.string().min(3),
        descriptions: z.string().min(3),
        city: z.string().min(3),
        province: z.string().min(3)
    }),
    livingAddres: z.object({
        address: z.string().min(3),
        descriptions: z.string().min(3),
        city: z.string().min(3),
        province: z.string().min(3)
    })
});
export const AddressDataForm = ({ student }: any) => {
    const navigate = useNavigate()

    const { livingAddres, birthPlaceAddres } = student.person

    const { register, reset, handleSubmit, formState: { errors } }: any = useForm({
        defaultValues: { livingAddres, birthPlaceAddres },
        resolver: zodResolver(FormSchema)
    })

    const onSubmit = async (form: any) => {
        debugger
        const { response: { data: response ,status} } = await Api.put({ service: services.student.students, data: {...form.data ,id:student.id } })
        alert(JSON.stringify(response))
        if(status === 200) {

        }

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col>
                    <h4>Endereço actual</h4></Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Endereço">
                            <Form.Control type="text" {...register("livingAddres.address")} />
                        </FloatingLabel>
                        {errors?.livingAddres?.address &&
                            <ErrorMessage message={errors?.livingAddres?.address?.message} />
                        }
                    </Form.Group>

                </Col>

            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Cidade">
                            <Form.Control type="text"{...register("livingAddres.city")} />
                        </FloatingLabel>
                        {errors?.livingAddres?.city &&
                            <ErrorMessage message={errors?.livingAddres?.city?.message} />
                        }
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Província">
                            <Form.Control type="text"  {...register("livingAddres.province")} />
                        </FloatingLabel>
                        {errors?.livingAddres?.province && <ErrorMessage message={errors?.livingAddres?.province?.message} />}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Localde Nascimento</h4></Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Endereço">
                            <Form.Control type="text" {...register("birthPlaceAddres.address")} />
                        </FloatingLabel>
                        {errors?.birthPlaceAddres?.address &&
                            <ErrorMessage message={errors?.birthPlaceAddres?.address?.message} />
                        }
                    </Form.Group>

                </Col>

            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Cidade">
                            <Form.Control type="text"{...register("birthPlaceAddres.city")} />
                        </FloatingLabel>
                        {errors?.birthPlaceAddres?.city &&
                            <ErrorMessage message={errors?.birthPlaceAddres?.city?.message} />
                        }
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Província">
                            <Form.Control type="text"  {...register("birthPlaceAddres.province")} />
                        </FloatingLabel>
                        {errors?.birthPlaceAddres?.province && <ErrorMessage message={errors?.birthPlaceAddres?.province?.message} />}
                    </Form.Group>
                </Col>
            </Row>
            <BasicControls />
        </form>
    )
}
