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

export const NewCourse = () => {

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Curso</span>
        <span>registar</span>
      </div>
      <h2 className="az-content-title">Registar Cursos</h2>

      <hr className="mg-y-30" />
      <div className="col-md-8 card-body">
        <CourseForm />
      </div>
    </div>
  )
}



const FormSchema = z.object({
  name: z.string().min(3).max(50),
  descriptions: z.string().optional()
});

export const CourseForm = () => {

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { register, handleSubmit,
    formState: { errors }, } = useForm({
      resolver: zodResolver(FormSchema)
    })

  const onSubmit = async (form: any) => {
    setLoading(true)
    const { response: { data: response, status } } = await Api.post({ service: services.academic.course, data: form })

    if (status === 200) {
      setData(response)
      navigate(`/pedagogical/courses/${response?.id}`)
      toast.success("Disciplina registado com sucesso!")
    } else {
      toast.error("Erro ao registar aa Disciplina, por favor tente mais tarde")
    }
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
        <Col></Col>
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

