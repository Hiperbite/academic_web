import React, { useState } from 'react'
import { Form, Col, FloatingLabel, Row, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const ContactRegisterForm = ({ contact: data, i, onChange }: any) => {

    const [contact, setContact] = useState(data);
    const { getValues, register, reset, handleSubmit,
        formState: { errors }, } = useForm({
            defaultValues: data,
        })

    const handleChange = ({ contacts }: any) => {
        setTimeout(() => onChange(getValues(), i), 100)
    };
    const types: any = {
        EMAIL: 'E-mail',
        WHATSAPP: 'WhatsApp',
        TELEPHONE: 'Telefone'
    }
    return (
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Tipo de contacto"
                        className="mb-3">
                        <Form.Select aria-label="Default select example" {...register("type")} onChange={handleChange}>
                            {Object.keys(types).map((key: string) => <option value={key}>{types[key]}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Descrição"
                        className="mb-3">
                        <Form.Control type="text" required {...register("descriptions")} onKeyUp={handleChange} onChange={handleChange} />
                    </FloatingLabel>
                </Form.Group>
            </Col>
        </Row>
    )
}
