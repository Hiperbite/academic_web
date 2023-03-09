import React from 'react'

import { useFieldArray, useForm, } from 'react-hook-form'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { BasicControls } from '../../../../Components/Controls'
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { Api, services } from '../../../../../app/api/Api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const DocumentDataForm = ({ student }: any) => {
    const { register, control, handleSubmit } = useForm({
        defaultValues: { documents: student?.person?.documents }// you can populate the fields by this attribute 
    });
    const navigate = useNavigate();
    const errors: any = {};
    const { fields, append, remove } = useFieldArray({
        control,
        name: "documents"
    });

    const onSubmit = async (data: any) => {
        const { response: { data: response, status } } = await Api.put({ service: services.common.documents, data: data.documents })
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
            {fields.map((item, index) => (<>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">


                            <FloatingLabel
                                controlId="floatingInput"
                                label="Tipo de documento"
                                className="mb-3">
                                <Form.Select aria-label="Default select example" required   {...register(`documents.${index}.type`,  { required: "Please enter your first name." })} >
                                    <option value="IDCARD">Bilhete de Identidade</option>
                                    <option value="PASSPORT">Passaporte</option>
                                    <option value="RESIDENCE_CARD">Cartao de residencia</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Numero"
                                className="mb-3">
                                <Form.Control type="text" {...register(`documents.${index}.descriptions`,  { required: "Please enter your first name." })} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Data de Emissão"
                                className="mb-3">
                                <Form.Control type="date" {...register(`documents.${index}.issueDate`)} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Data de validade"
                                className="mb-3">
                                <Form.Control type="date" {...register(`documents.${index}.validationDate`)} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col xs lg={1}>

                        <Button variant='secondary' onClick={() => remove(index)}>x</Button>
                    </Col>

                </Row>
                <hr />
            </>
            ))}
            <Button
                type="button"
                onClick={() => append({ type: "", descriptions: "", personId: student?.personId })}
            > + </Button>
            <BasicControls />
        </form>
    );
}
