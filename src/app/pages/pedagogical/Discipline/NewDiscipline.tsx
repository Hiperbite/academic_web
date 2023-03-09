import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, FloatingLabel, Row } from "react-bootstrap";

import { toast } from 'react-toastify';

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
  descriptions: z.string().max(500).optional()
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
    const { response: { data: response, status } } = await Api.post({ service: services.academic.discipline, data: form })
    if (status === 200) {
      toast.success('Sala de aulas registada com successo');
      navigate(`/pedagogical/disciplines/${response?.id}`)
    }
    setData(response)
    setLoading(false)
  }

  return (<>
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
        <Col />
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Descricao">
              <Form.Control as="textarea" rows={6} style={{ height: "160px" }} {...register("descriptions")} />
            </FloatingLabel>
            {errors.descriptions && <ErrorMessage message={errors.descriptions?.message} />}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <BasicControls />
        </Col>
      </Row>
    </form>
  </>
  )
}

