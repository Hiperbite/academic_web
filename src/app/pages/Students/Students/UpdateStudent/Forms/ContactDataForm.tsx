import React from 'react'

import { useFieldArray, useForm, } from 'react-hook-form'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { BasicControls } from '../../../../Components/Controls'
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { Api, services } from '../../../../../app/api/Api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ContactDataForm = ({ student }: any) => {
    const { register, control, handleSubmit } = useForm({
        defaultValues: { contacts: student?.person?.contacts }// you can populate the fields by this attribute 
    });
    const navigate = useNavigate();
    const errors: any = {};
    const { fields, append, remove } = useFieldArray({
        control,
        name: "contacts"
    });

    const onSubmit = async (data: any) => {
        const { response: { data: response, status } } = await Api.put({ service: services.common.contacts, data: data.contacts })
        if (status === 200) {
            toast.success('Contactos actualizados com sucesso');
        }
        else {
            toast.error('Não foi possive registar os contactos, por favor tente masi tarde');
        }

        navigate('/students/show/' + student?.id);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            {errors.type &&
                                <ErrorMessage message={errors.type?.message} />
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

                            {errors.type &&
                                <ErrorMessage message={errors.type?.message} />
                            }
                        </Form.Group>
                    </Col>
                    <Col xs lg={1}>

                        <Button variant='secondary' onClick={() => remove(index)}>x</Button>
                    </Col>
                </Row>
            ))}
            <Button
                type="button"
                onClick={() => append({ type: "", descriptions: "", personId: student?.personId })}
            > + </Button>
            <BasicControls />
        </form>
    );
}

