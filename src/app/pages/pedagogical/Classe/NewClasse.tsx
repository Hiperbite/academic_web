import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Col, FloatingLabel, ProgressBar, Row } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { useRegisterClasseData } from '../../../app/api/pedagogical/classe';
import useAxiosFetch, { Api, services } from '../../../app/api/Api';
import { BasicControls } from '../../Components/Controls';
import { numericString } from '../../../helpers/form.helpers';

export const NewClasse = () => {

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Candidatos</span>
        <span>Listagem</span>
      </div>
      <h2 className="az-content-title">Registar nova Turma</h2>

      <hr className="mg-y-30" />

      <div className="col-md-8 card-body">

        <ClassForm />
      </div>


    </div>
  )
}


const FormSchema = z.object({
  code: z.string().min(3).max(20),
  classeRoomId: z.string().min(3),
  descriptions: z.string(),
  isActive: z.boolean(),
  semester: numericString(z.number().positive().max(10)),
  periodId: z.string().min(3),
  courseId: z.string().min(3),
});

const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const ClassForm = () => {

  const { data: academicPeriods } = useAxiosFetch(services.academic.period)
  const { data: classeRooms } = useAxiosFetch(services.academic.classRoom)
  const [courses, setCourses] = useState([])

  useMemo(async () => {
    //setLoading(true)
    const { response: { data: response } } = await Api.get({ service: services.academic.course, params: { pageSize: 100 } })
    setCourses(response?.data)
    //setLoading(false)
  }, [])
  const { post, data, loading, error } = useRegisterClasseData();

  const navigate = useNavigate()
  const { register, handleSubmit,
    formState: { errors }, } = useForm({
      resolver: zodResolver(FormSchema)
    })

  const onSubmit = (form: any) => {

    post(form)
  }
  useEffect(() => {
    if (data?.id) {
      toast("Turma registada com sucesso!")
    }
  }, [data])
  return (<>
    {data?.id ? <MessageScreen message={"Turma registada com successo"} data={data} status={'success'} /> : null}
    {data?.id == null ?
      <form onSubmit={handleSubmit(onSubmit)} >
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Codigo">
                <Form.Control type="text" {...register("code")} />
              </FloatingLabel>
              {errors.code &&
                <ErrorMessage message={errors.code?.message} />
              }
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col >
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingInput"
                label="Periodo">
                <Form.Select aria-label="Default select example"
                  {...register("periodId")}
                >
                  <option value={undefined}>-</option>
                  {academicPeriods?.map(({ id, code, descriptions }: any) => <option value={id}>{code} - {descriptions}</option>)}
                </Form.Select>
              </FloatingLabel>
              {errors.periodId && <ErrorMessage message={errors.periodId?.message} />}
            </Form.Group>

          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingInput"
                label="Semestre">
                <Form.Select aria-label="Default select example"
                  {...register("semester")}
                ><option value={undefined}>-</option>
                  {semesters?.map((semester: number) => <option value={semester}>{semester}</option>)}
                </Form.Select>
              </FloatingLabel>
              {errors.semester && <ErrorMessage message={errors.semester?.message} />}
            </Form.Group>

          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Descricao">
                <Form.Control as="textarea" rows={6} {...register("descriptions")} style={{ height: '120px' }} />
              </FloatingLabel>
              {errors.descriptions && <ErrorMessage message={errors.descriptions?.message} />}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingInput"
                label="Sala">
                <Form.Select aria-label="Default select example"
                  {...register("classeRoomId")}
                >
                  <option value={undefined}>-</option>
                  {classeRooms?.data?.map(({ id, code, size }: any) => <option value={id}>{code} - {size}</option>)}
                </Form.Select>
              </FloatingLabel>
              {errors.classeRoomId && <ErrorMessage message={errors.classeRoomId?.message} />}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingInput"
                label="Curso">
                <Form.Select aria-label="Default select example"
                  {...register("courseId")}
                >
                  <option value={undefined}>-</option>
                  {courses?.map(({ id, code, name }: any) => <option value={id}>{code} - {name}</option>)}
                </Form.Select>
              </FloatingLabel>
              {errors.courseId && <ErrorMessage message={errors.courseId?.message} />}
            </Form.Group>
          </Col>
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
      </form> : null}
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
        <Link to={`/pedagogical/classe/${data?.id}`}>Ver dados registados</Link>
        <br />
        <br />
        <br />
        <br />
      </Card.Body>
    </Card>
  )
}


