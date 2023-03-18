import React from 'react'

import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { BasicControls, Controls } from '../../../../Components/Controls'

import DatePicker from 'react-date-picker'
import moment from 'moment'
import { ErrorMessage } from '../../../../Components/ErrorMessage'
import { useSelector } from 'react-redux'

export const DocumentDataForm = ({ onSubmit, data }: any) => {

    const { documents: stored } = useSelector((state: any) => state.documents)

    const { register, control, handleSubmit, formState: { errors } }: any = useForm({
        defaultValues: { documents: stored ? stored : data?.person?.documents ?? [{}] }// you can populate the fields by this attribute 
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "documents"
    });

    const current = 3, total = 6;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item: any, index) => (<>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Tipo de documento"
                                className="mb-3">
                                <Form.Select aria-label="Default select example" required   {...register(`documents.${index}.type`, { required: "Please enter your first name." })} >
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
                                <Form.Control type="text" {...register(`documents.${index}.descriptions`, { required: "O numero do documento é obrigatório." })} />
                            </FloatingLabel>
                            {errors.documents && errors?.documents[index].descriptions && <ErrorMessage message={errors?.documents[index].descriptions.message} />}
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
                                <Controller
                                    render={({
                                        field: { onChange, value, name, ref },
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => <DatePicker
                                            maxDate={(new Date())}
                                            minDate={(new Date(new Date().setFullYear(new Date().getFullYear() - 50)))}
                                            clearIcon={null} format="dd/MM/yyyy" className="form-control" onChange={onChange} value={value ? moment(value).toDate() : null} />}
                                    control={control}
                                    {...register(`documents.${index}.issueDate`)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Data de validade"
                                className="mb-3">
                                <Controller
                                    render={({
                                        field: { onChange, onBlur, value, name, ref },
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => <DatePicker
                                            minDate={(new Date())}
                                            maxDate={(new Date(new Date().setFullYear(new Date().getFullYear() + 50)))}
                                            clearIcon={null} format="dd/MM/yyyy" className="form-control" onChange={onChange} value={value ? moment(value).toDate() : null} />}
                                    control={control}
                                    {...register(`documents.${index}.validationDate`)}
                                />
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
                onClick={() => append({ type: "", descriptions: "", personId: data?.student?.personId })}
            > + </Button>

            {data?.id ? <BasicControls /> : <Controls current={current} total={total} />}
        </form>
    );
}
