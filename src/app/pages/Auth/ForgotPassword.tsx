import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForgotPasswordHandlerData } from "../../app/api/auth/authentication";
import { ErrorMessage } from "../Components/ErrorMessage";

const FormSchema = z.object({
    email: z.string().email({
        message: 'Por favor insira um E-mail válido.',
      }),
});


export const ForgotPassword = () => {

    const navigate = useNavigate()

    const { post, data, loading, error } = useForgotPasswordHandlerData();

    const { register, handleSubmit,
        formState: { errors }, } = useForm({
            resolver: zodResolver(FormSchema)
        })

    const onSubmit = (form: any) => post(form)


    return <div className="az-column-signup">
        <h1 className="az-logo">az<span>i</span>a</h1>
        <div className="az-signup-header">
            <h2>Esqueceu a palvra-passe?</h2>
            <br />
            <br />
            <p>Digite o seu endereço de e-mail da sua conta nova abaixo e enviaremos um e-mail com um link para redefinir sua palavra-passe.</p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="E-mail">
                                <Form.Control autoComplete="off" type="text" {...register("email")} />
                            </FloatingLabel>
                            {errors.email &&
                                <ErrorMessage message={errors.email?.message} />
                            }
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            Solicitar redefinição de palavra-pass
                        </Button>
                    </Col>

                </Row>
            </form>

        </div>{/*<!-- az-signup-header -->*/}
        <div className="az-signup-footer">
            <p> {"<"} Voltar para a página de <Link to="/auth/singin">Autenticação</Link></p>
        </div>{/*<!-- az-signin-footer -->*/}
        <Modal show={data?.status === 200} fullscreen={true} onHide={() => navigate('/auth/singin')}>
            <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body className="align-middle" style={{ padding: "10%" }}>
                <Row>
                    <Col className=" text-center">
                        <Button variant="primary" size="lg" style={{
                            borderRadius: "100px !important",
                            height: "100px", width: "100px", fontSize: "40px"
                        }}>
                            <i className="fa fa-check"></i>
                        </Button>{' '}
                        <br />
                        <br />
                        <br />
                        <h1>Solicitação de redefinição feita com sucesso</h1>
                        <h4>Você já pode fechar esta janela</h4>
                        <Button variant="secondary" onClick={() => navigate('/auth/singin')}><i className="fa fa-chevron-left"></i> Voltar</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    </div>
}