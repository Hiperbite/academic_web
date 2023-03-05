
import Form from 'react-bootstrap/Form';
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Col, FloatingLabel,  Row } from "react-bootstrap";

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../Components/ErrorMessage';

import { BasicControls } from '../../Components/Controls';
import { Api, services } from '../../../app/api/Api';


export const UpdateCourse = () => {

  const { id } = useParams()

  const [course, setCourse] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  useMemo(async () => {
    setLoading(true)
    const { response: { data: response } } = await Api.get({ service: services.academic.course, id })
    setCourse(response)
    setLoading(false)
  }, [])

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academico</span>
        <span>Curso</span>
        <span>Actualizar</span>
        <span>#{course?.code}</span>
      </div>
      <h2 className="az-content-title">Actualizar Curso #{course?.code}</h2>

      <hr className="mg-y-30" />

      <div className="col-md-8 card-body">

        {course ? <CourseForm course={course} /> : null }
      </div>


    </div>
  )
}



const FormSchema = z.object({
  name: z.string().min(3).max(20),
  descriptions: z.string().optional(),
  isActive: z.boolean()

});

export const CourseForm = ({course}:any) => {

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { register, handleSubmit,
    formState: { errors }, } = useForm({
      defaultValues:course,
      resolver: zodResolver(FormSchema)
    })

  const onSubmit = async (form: any) => {
    setLoading(true)
    debugger
    const { response: { data: response, status } } = await Api.put({ service: services.academic.course, data: {...form, id:course.id} })
    setData(response)
    if(status === 200) {
      toast.success("Curso actualziada com sucesso!")
      navigate(`/pedagogical/courses/${course?.id}`)
    }
    setLoading(false)
  }

  return (<>
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


            <Form.Check
              type="switch"
              id="custom-switch"
              label="Activo/Desactivo"
              {...register("isActive")}
            />
          </Col>
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

