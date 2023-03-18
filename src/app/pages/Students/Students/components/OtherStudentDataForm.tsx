import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { z } from "zod";

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";
import { Api, services } from "../../../../app/api/Api";
import { ErrorMessage } from "../../../Components/ErrorMessage";
import { BasicControls, Controls } from "../../../Components/Controls";
import { useSelector } from "react-redux";


const FormSchema = z.object({
    desiredCourseId: z.string().min(3),
});
export const OtherStudentDataForm = ({ onSubmit, data }: any) => {

    const stored = useSelector((state: any) => state.data)
    const [courses, setCourses] = useState<any[]>()
    useMemo(async () => {
        const { response: { data: response, status } } =
            await Api.get({ service: services.academic.course, params: {} })
        setCourses(response?.data ?? [])
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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Curso que pretende se candidatar">
                            <Form.Select aria-label="Default select example"{...register('desiredCourseId')} >
                                {courses?.map(({ id, code, name }: any) => <option value={id}>{code} - {name}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        {errors?.desiredCourseId &&
                            <ErrorMessage message={errors?.desiredCourseId?.message} />
                        }
                    </Form.Group>
                </Col>
            </Row>

            {data?.id ? <BasicControls /> : <Controls current={current} total={total} />}
        </form>
    )
}
