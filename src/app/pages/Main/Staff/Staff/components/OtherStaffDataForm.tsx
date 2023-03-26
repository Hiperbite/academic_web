import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { z } from "zod";

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";
import { Api, services } from "../../../../../app/api/Api";
import { ErrorMessage } from "../../../../Components/ErrorMessage";
import { BasicControls, Controls } from "../../../../Components/Controls";
import { useSelector } from "react-redux";

const roles =
    [
        'SECRETARY',
        'TEACHER',
        'CORDENATOR',
        'SUPERVISOR'
    ]

const FormSchema = z.object({
    categoryId: z.string().min(3),
    careerId: z.string().min(3),
    roles: z.array(z.string().min(3)),
});
export const OtherStaffDataForm = ({ onSubmit, data }: any) => {

    const stored = useSelector((state: any) => state.data)
    const [categories, setCategories] = useState<any[]>()
    const [careers, setCareers] = useState<any[]>()
    useMemo(async () => {
        const { response: { data: response, status } } =
            await Api.get({ service: services.common.categories, params: {} })
        setCategories(response?.data ?? [])
        const { response: { data: res, status: st } } =
            await Api.get({ service: services.common.careers, params: {} })
        setCareers(res?.data ?? [])
        if (status !== 200) {
            toast.error('Some wrong thing happened while collected the courses')
        }
    }, [])
    const { register, handleSubmit, control,
        formState: { errors }, }: any = useForm({
            defaultValues: stored ?? data?.data,
            resolver: zodResolver(FormSchema)
        })
    const current = 4, total = 6;
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Careira">
                                    <Form.Select aria-label="Default select example"{...register('careerId')} >
                                        {careers?.map(({ id, code, name }: any) => <option value={id}>{code} {name}</option>)}
                                    </Form.Select>
                                </FloatingLabel>
                                {errors?.careerId &&
                                    <ErrorMessage message={errors?.careerId?.message} />
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Categoria">
                                    <Form.Select aria-label="Default select example"{...register('categoryId')} >
                                        {categories?.map(({ id, code, name }: any) => <option value={id}>{code} {name}</option>)}
                                    </Form.Select>
                                </FloatingLabel>
                                {errors?.categoryId &&
                                    <ErrorMessage message={errors?.categoryId?.message} />
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Funcao">
                            <Form.Select style={{height:'130px'}} multiple aria-label="Default select example"{...register('roles')} >
                                {roles?.map((role: string) => <option value={role}>{role}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        {errors?.roles &&
                            <ErrorMessage message={errors?.roles?.message} />
                        }
                    </Form.Group>
                </Col>
            </Row>


            {data?.id ? <BasicControls /> : <Controls current={current} total={total} />}
        </form>
    )
}
