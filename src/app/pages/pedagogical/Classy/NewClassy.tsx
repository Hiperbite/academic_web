import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Col, FloatingLabel, ProgressBar, Row } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { useRegisterClassyData } from '../../../app/api/pedagogical/classy';
import useAxiosFetch, { services } from '../../../app/api/Api';
import { BasicControls } from '../../Components/Controls';
import { numericString } from '../../../helpers';

export const NewClassy = () => {

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
  classyRoomId: z.string().min(3),
  academicShiftId: z.string().min(3),
  grade: numericString(z.number().positive().max(1000)),
  academicPeriodId: z.string().min(3)

});
export const ClassForm = () => {


  const { data: academicPeriods } = useAxiosFetch(services.academic.period)
  const { data: academicShifts } = useAxiosFetch(services.academic.shift)
  const { data: classyRooms } = useAxiosFetch(services.academic.classRoom)

  const { post, data, loading, error } = useRegisterClassyData();

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
                  {...register("academicPeriodId")}
                >
                  <option value={undefined}>-</option>
                  {academicPeriods?.map(({ id, code }: any) => <option value={id}>{code}</option>)}
                </Form.Select>
              </FloatingLabel>
              {errors.academicPeriodId && <ErrorMessage message={errors.academicPeriodId?.message} />}
            </Form.Group>

          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingInput"
                label="Periodo Academico">
                <Form.Select aria-label="Default select example"
                  {...register("academicShiftId")}
                ><option value={undefined}>-</option>
                  {academicShifts?.map(({ id, code, descriptions }: any) => <option value={id}>{code} - {descriptions}</option>)}
                </Form.Select>
              </FloatingLabel>
              {errors.academicShiftId && <ErrorMessage message={errors.academicShiftId?.message} />}
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
                  {...register("classyRoomId")}
                >
                  <option value={undefined}>-</option>
                  {classyRooms?.data?.map(({ id, code, size }: any) => <option value={id}>{code} - {size}</option>)}
                </Form.Select>
              </FloatingLabel>
              {errors.classyRoomId && <ErrorMessage message={errors.classyRoomId?.message} />}
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
                <Form.Control as="textarea" style={{height: '160px'}} rows={3} {...register("descriptions")} />
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
        <Link to={`/pedagogical/classy/${data?.id}`}>Ver dados registados</Link>
        <br />
        <br />
        <br />
        <br />
      </Card.Body>
    </Card>
  )
}
