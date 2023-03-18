import React, { useState } from 'react'

import { useFieldArray, useForm, } from 'react-hook-form'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { BasicControls, Controls } from '../../../../Components/Controls'
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'

const ContactFormSchema = z.object({
    type: z.string().min(3).max(20),
    descriptions: z.string(),
    id: z.string().uuid().optional().nullable()
})
    .superRefine((v: any, ctx: any) => {

        if (v.type === 'EMAIL') {
            const validEmail: any = z.string().email().safeParse(v.descriptions)

            if (!validEmail.success) {
                ctx.addIssue(validEmail?.error?.issues[0]);
            }
        } else {
            const validPhoneNumber: any = z.union(
                [
                    z.string().startsWith('9').min(9).max(9),
                    z.string().startsWith('22').min(9).max(9),
                    z.string().startsWith('23').min(9).max(9)
                ]
            ).safeParse(v.descriptions)

            if (!validPhoneNumber.success) {
                validPhoneNumber?.error?.issues.map((issue: any) => ctx.addIssue(issue));
            }
        }
    })
const FormSchema = z.object({
    contacts: ContactFormSchema.array().min(1)
});

export const ContactDataForm = ({ onSubmit, data }: any) => {
    const stored = useSelector((state: any) => state.contacts)

    const { register, control, handleSubmit, reset, formState: { errors }, }: any = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: { contacts: stored[0].type ? stored : data?.person?.contacts.filter(({ isActive }: any) => isActive) ?? [{}] }// you can populate the fields by this attribute 
    });

    const current = 2, total = 6;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "contacts"
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Contactos</h3>
            {fields.map((item, index) => (
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Tipo">
                                <Form.Select aria-label="Default select example"{...register(`contacts.${index}.type`)} >
                                    <option value="EMAIL">Email</option>
                                    <option value="PHONENUMBER">Telefone</option>
                                    <option value="WHATSAPP">WhatsApp</option>
                                </Form.Select>
                            </FloatingLabel>

                            {errors.contacts && errors.contacts[index] && errors.contacts[index].type &&
                                <ErrorMessage message={errors.contacts[index].type.message} />
                            }
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Descrição">
                                <Form.Control type="text" {...register(`contacts.${index}.descriptions`)} />
                            </FloatingLabel>

                            {errors.contacts && errors.contacts[index] && errors.contacts[index].descriptions &&
                                <ErrorMessage message={errors.contacts[index].descriptions.message} />}
                            {errors.contacts && errors.contacts[index] && errors.contacts[index].message &&
                                <ErrorMessage message={errors.contacts[index].message} />}
                        </Form.Group>
                    </Col>
                    <Col xs lg={1}>
                        <Button variant='secondary' onClick={() => remove(index)}>x</Button>
                    </Col>
                </Row>
            ))}
            <Button
                type="button"
                onClick={() => append({ type: "", descriptions: "", personId: data?.student?.personId })}
            > + </Button>

            {data?.id ? <BasicControls /> : <Controls current={current} total={total} />}
        </form>
    );
}

