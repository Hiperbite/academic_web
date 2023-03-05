import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, FloatingLabel, Row } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { Api, services } from '../../../app/api/Api';
import { BasicControls } from '../../Components/Controls';

export const NewDiscipline = () => {

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Disciplina</span>
        <span>registar</span>
      </div>
      <h2 className="az-content-title">Registar Disciplinas</h2>

      <hr className="mg-y-30" />
      <div className="col-md-8 card-body">
        <DisciplineForm />
      </div>
    </div>
  )
}



const FormSchema = z.object({
  name: z.string().min(3).max(50),
  descriptions: z.string().optional()
});

export const DisciplineForm = () => {

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { register, handleSubmit,
    formState: { errors }, } = useForm({
      resolver: zodResolver(FormSchema)
    })

  const onSubmit = async (form: any) => {
    setLoading(true)
    const { response: { data: response } } = await Api.post({ service: services.academic.discipline, data: form })
    setData(response)
    setLoading(false)
  }

  return (<>
    {data?.id ? <MessageScreen message={"Sala de aulas registada com successo"} data={data} status={'success'} /> : null}
    {data?.id == null ?
      <form onSubmit={handleSubmit(onSubmit)} >
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Nome">
                <Form.Control type="text" {...register("name")} />
              </FloatingLabel>
              {errors.name &&
                <ErrorMessage message={errors.name?.message} />
              }
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Descricao">
                  <Form.Control as="textarea" rows={6} {...register("descriptions")} />
                </FloatingLabel>
                {errors.descriptions && <ErrorMessage message={errors.descriptions?.message} />}
              </Form.Group>
            </Col>
          </Row>
          <Col />
        </Row>

        <Row>
          <Col>
            <BasicControls />
          </Col>
        </Row>
      </form> : <></>}
  </>
  )
}

const MessageScreen = ({ message, status, data }: any) => {
  return (
    <Card>
      <Card.Body style={{ "textAlign": "center" }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>Ok</h1>
        <h3>{message}</h3>
        <Link to={`/pedagogical/disciplines/${data?.id}`}>Ver dados registados</Link>
        <br />
        <br />
        <br />
        <br />
      </Card.Body>
    </Card>
  )
}
