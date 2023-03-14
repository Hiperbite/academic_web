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
import { toast } from 'react-toastify'
const FormSchema = z.object({
    birthPlaceAddress: z.object({
        address: z.string().min(3),
        //    descriptions: z.string().min(3),
        city: z.string().min(3),
        province: z.string().min(2)
    }),
    livingAddress: z.object({
        address: z.string().min(3),
        //    descriptions: z.string().min(3),
        city: z.string().min(3),
        province: z.string().min(2)
    })
});
export const AddressDataForm = ({ staff }: any) => {
    const navigate = useNavigate()

    const { livingAddress, birthPlaceAddress } = staff?.person

    const { register, handleSubmit, formState: { errors } }: any = useForm({
        defaultValues: { livingAddress, birthPlaceAddress },
        resolver: zodResolver(FormSchema)
    })

    const onSubmit = async (form: any) => {
        const { livingAddress:updatedlivingAddress, birthPlaceAddress:updatedbirthPlaceAddress } = form

        const { response: { data: response, status } } =
            await Api.put(
                {
                    service: services.common.address,
                    data: { 
                        livingAddress:{...livingAddress,...updatedlivingAddress}, 
                        birthPlaceAddress:{...birthPlaceAddress,...updatedbirthPlaceAddress},
                        personId: staff?.person.id }
                })

        if (status === 200) {
            toast.success('Endereços actualizados com sucesso.');
            navigate('/staffs/show/' + staff?.id);
        }
        else {
            toast.error('Não foi possive salvar os endereços, por favor tente mais tarde');
        }


    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col><h4>Endereço actual</h4></Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Endereço">
                            <Form.Control type="text" {...register("livingAddress.address")} />
                        </FloatingLabel>
                        {errors?.livingAddress?.address &&
                            <ErrorMessage message={errors?.livingAddress?.address?.message} />
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
                            <Form.Control type="text"{...register("livingAddress.city")} />
                        </FloatingLabel>
                        {errors?.livingAddress?.city &&
                            <ErrorMessage message={errors?.livingAddress?.city?.message} />
                        }
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Província">
                            <Form.Control type="text"  {...register("livingAddress.province")} />
                        </FloatingLabel>
                        {errors?.livingAddress?.province && <ErrorMessage message={errors?.livingAddress?.province?.message} />}
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
                            <Form.Control type="text" {...register("birthPlaceAddress.address")} />
                        </FloatingLabel>
                        {errors?.birthPlaceAddress?.address &&
                            <ErrorMessage message={errors?.birthPlaceAddress?.address?.message} />
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
                            <Form.Control type="text"{...register("birthPlaceAddress.city")} />
                        </FloatingLabel>
                        {errors?.birthPlaceAddress?.city &&
                            <ErrorMessage message={errors?.birthPlaceAddress?.city?.message} />
                        }
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Província">
                            <Form.Control type="text"  {...register("birthPlaceAddress.province")} />
                        </FloatingLabel>
                        {errors?.birthPlaceAddress?.province && <ErrorMessage message={errors?.birthPlaceAddress?.province?.message} />}
                    </Form.Group>
                </Col>
            </Row>
            <BasicControls />
        </form>
    )
}
