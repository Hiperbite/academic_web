import React from 'react'

import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { BasicControls, Controls } from '../../../../Components/Controls'
import { z } from "zod";

import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';

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
export const AddressDataForm = ({ onSubmit, data }: any) => {

    const stored = useSelector((state: any) => state.address)

    const { register, handleSubmit, control,
        formState: { errors }, }: any = useForm({
            defaultValues: stored?.livingAddress ? stored : data?.person,
            resolver: zodResolver(FormSchema)
        })
    const current = 5, total = 6;
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

            {data?.id ? <BasicControls /> : <Controls current={current} total={total} />}
        </form>
    )
}
