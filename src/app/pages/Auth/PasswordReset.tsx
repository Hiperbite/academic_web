import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useState } from "react";
import { Alert, Button, Col, FloatingLabel, Form, Modal, ProgressBar, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useCheckResetPasswordHandlerData, useResetPasswordHandlerData } from "../../app/api/auth/authentication";
import { ErrorMessage } from "../Components/ErrorMessage";



const FormSchema = z.object({
    password: z.string().min(8, {
        message: 'A Palavra-passe deve conter pelomenos 8 caracteres.',
    }),
    passwordConfirmation: z.string()/*.min(8, {
      //  message: 'A Palavra-passe deve conter pelomenos 8 caracteres.',
    }),*/
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "As palavra-passes não coencidem",
    path: ["passwordConfirmation"],
}).refine((data) => passwordComplexity(data.password) > 3, {
    message: "Defina uma palavra-passe masi complexa",
    path: ["password"],
});

const passwordComplexity = (password: string): number => {
    if (password.length < 8)
        return 0;
    return [
/* up to 12 characters */ password.length > 3,
/* up to 12 characters */ password.length > 12,
/* hasUpperCase = */ /[A-Z]/.test(password),
/* hasLowerCase = */ /[a-z]/.test(password),
/* hasNumbers = */ /\d/.test(password),
/* hasNonalphas = */ /[^A-Za-z0-9]/.test(password)]
        .filter((x: boolean) => x).length
}
const states:any = {
    200: {
        variant: 'primary',
        icon: 'fa fa-check',
        body: ({message}:any) => <><h1>Solicitação de redefinição feita com sucesso</h1><h4>Você já pode fechar esta janela</h4></>
    },
    404: {
        variant: 'danger',
        icon: 'fa fa-times',
        body: ({message}:any) => <><Alert  variant="danger">{message}</Alert><h1>lamentamos mas o seu link de redefinição de senha não é válido ou já foi usado.</h1><h4>Você já pode fechar esta janela</h4></>
    },
    400: {
        variant: 'danger',
        icon: 'fas fa-sad-tear',
        body: () => <><h1>lamentamos mas o seu link de redefinição de senha não é válido ou já foi usado.</h1><h4>Você já pode fechar esta janela</h4></>
    },
}
export const PasswordReset = () => {

    const { code: passwordResetCode, kid: id } = useParams()

    const navigate = useNavigate()
    const [state, setstate] = useState<any>({})
    const [complexity, setComplexity] = useState(1)
    const { post, data, loading, error }: any = useResetPasswordHandlerData();
    const { get, data: { response, status }, loading: l, error: err }: any = useCheckResetPasswordHandlerData();

    const { register, handleSubmit, watch,
        formState: { errors }, } = useForm({
            resolver: zodResolver(FormSchema)
        })

    useMemo(() => get({ passwordResetCode, id }), [passwordResetCode, id])
    useMemo(() => setstate(states[data?.status ?? status ?? 400]), [data, status])

    const password = watch('password') ?? "";
    useMemo(() => setComplexity(passwordComplexity(password)), [password])

    const onSubmit = (form: any) => post(form, { passwordResetCode, id })


    return <div className="az-column-signup">
        <h1 className="az-logo">az<span>i</span>a</h1>
        <div className="az-signup-header">
            <h2>Redefinir a palvra-passe?</h2>
            <br />
            <br />
            <p>Defina uma nova palavra passe pra sua conta.</p>

            <form onSubmit={handleSubmit(onSubmit)} >

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="E-mail">
                                <Form.Control disabled value={response?.email} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Palavra-passe">
                                <Form.Control autoComplete="off" type="password" {...register("password")} />
                                <ProgressBar style={{ height: '5px' }} variant={["danger", "danger", "danger", "danger", "warning", "info", "", "success"][complexity]} now={complexity * 15} />
                            </FloatingLabel>
                            {errors.password &&
                                <ErrorMessage message={errors.password?.message} />
                            }
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Confirme a sua Palavra-passe">
                                <Form.Control autoComplete="off" type="password" {...register("passwordConfirmation")} />
                            </FloatingLabel>
                            {errors.passwordConfirmation &&
                                <ErrorMessage message={errors.passwordConfirmation?.message} />
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
        <Modal show={data?.status === 200 || status !== 200} fullscreen={true} onHide={() => navigate('/auth/singin')}>
            <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body className="align-middle" style={{ padding: "10% 20%" }}>
                <Row>
                    <Col className=" text-center">
                        <Button variant={state?.variant} size="lg" style={{
                            borderRadius: "100px !important",
                            height: "100px", width: "100px", fontSize: "40px"
                        }}>
                            <i className={state?.icon}></i>
                        </Button>{' '}
                        <br />
                        <br />
                        <br />
                        <state.body message={response}/>
                        <br />
                        <Button variant="secondary" onClick={() => navigate('/auth/singin')}><i className="fa fa-chevron-left"></i> Voltar</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    </div>
}