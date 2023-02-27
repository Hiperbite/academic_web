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
import { useRegisterClassRoomData } from '../../../app/api/pedagogical/classy';
import useAxiosFetch, { services } from '../../../app/api/Api';
import { BasicControls } from '../../Components/Controls';

export const NewClassRoom = () => {

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Candidatos</span>
        <span>Listagem</span>
      </div>
      <h2 className="az-content-title">Registar Sala de aulas</h2>

      <div className="az-content-label mg-b-5">Simple Table</div>
      <p className="mg-b-20">Using the most basic table markup.</p>

      <hr className="mg-y-30" />

      <div className="col-md-8 card-body">

        <ClassRoomForm />
      </div>


    </div>
  )
}



const FormSchema = z.object({
  code: z.string().min(3).max(20),
  descriptions: z.string().optional(),
  size: z.string()
});

export const ClassRoomForm = () => {


  const { data: academicPeriods } = useAxiosFetch(services.academic.period)
  const { data: academicShifts } = useAxiosFetch(services.academic.shift)
  const { data: classyRooms } = useAxiosFetch(services.academic.classRoom)

  const { post, data, loading, error } = useRegisterClassRoomData();

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
      toast.success("Sala registada com sucesso!")
    }
  }, [data])
  return (<>
    {data?.id ? <MessageScreen message={"Sala de aulas registada com successo"} data={data} status={'success'} /> : null}
    {data?.id == null ?
      <form onSubmit={handleSubmit(onSubmit)} >
        <Row>
          {JSON.stringify(data)}
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
          <Col><Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Lugares">
              <Form.Control type="text" {...register("size")} />
            </FloatingLabel>
            {errors.size &&
              <ErrorMessage message={errors.size?.message} />
            }
          </Form.Group></Col>
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
        <Link to={`/pedagogical/class-rooms/${data?.id}`}>Ver dados registados</Link>
        <br />
        <br />
        <br />
        <br />
      </Card.Body>
    </Card>
  )
}
