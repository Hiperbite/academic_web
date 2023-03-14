import React, { useMemo, useState } from 'react'

import { useFieldArray, useForm, } from 'react-hook-form'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { BasicControls } from '../../../../Components/Controls'
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { Api, services } from '../../../../../app/api/Api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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

export const ContactDataForm = ({ staff }: any) => {
    const [contacts, setcontacts] = useState<any>()
    const { register, control, handleSubmit, reset, formState: { errors }, }: any = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: { contacts: staff?.person?.contacts.filter(({isActive}:any)=>isActive) ?? [{}]}// you can populate the fields by this attribute 
    });
    const navigate = useNavigate();
    //const errors: any = {};
    const { fields, append, remove } = useFieldArray({
        control,
        name: "contacts"
    });

    const onSubmit = async (data: any) => {
        const { response: { data: response, status } } = await Api.put({ service: services.common.contacts, id: staff?.personId, data: data.contacts })
        if (status === 200) {
            toast.success('Contactos actualizados com sucesso');
            navigate('/staffs/show/' + staff?.id);
        }
        else {
            toast.error('Não foi possive registar os contactos, por favor tente mais tarde');
        }

    }
    useMemo(() => {
        setcontacts(errors?.contacts);
    }, [errors])

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

                            {contacts && contacts[index] && contacts[index].type &&
                                <ErrorMessage message={contacts[index].type.message} />
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

                            {contacts && contacts[index] && contacts[index].descriptions &&
                                <ErrorMessage message={contacts[index].descriptions.message} />}
                            {contacts && contacts[index] && contacts[index].message &&
                                <ErrorMessage message={contacts[index].message} />}
                        </Form.Group>
                    </Col>
                    <Col xs lg={1}>
                        <Button variant='secondary' onClick={() => remove(index)}>x</Button>
                    </Col>
                </Row>
            ))}
            <Button
                type="button"
                onClick={() => append({ type: "", descriptions: "", personId: staff?.personId })}
            > + </Button>
            <BasicControls />
        </form>
    );
}

