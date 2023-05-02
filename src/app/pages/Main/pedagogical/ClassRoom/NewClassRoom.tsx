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
import { ErrorMessage } from '../../../Components/ErrorMessage';
import { useRegisterClassRoomData } from '../../../../app/api/pedagogical/classe';
import useAxiosFetch, { services } from '../../../../app/api/Api';
import { BasicControls } from '../../../Components/Controls';
import { numericString } from '../../../../helpers/form.helpers';

export const NewClassRoom = () => {

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academico</span>
        <span>Sala de aulas</span>
        <span>Registo</span>
      </div>
      <h2 className="az-content-title">Registar Sala de aulas</h2>
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
  size: numericString(z.number().positive().max(1000)),
});

export const ClassRoomForm = () => {
  const navigate = useNavigate()
  const { post, data, loading, error } = useRegisterClassRoomData();
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
      navigate(`/pedagogical/class-rooms/${data?.id}`)
    }
  }, [data, navigate])
  return (
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
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Lugares">
            <Form.Control type="number" {...register("size")} />
          </FloatingLabel>
          {errors.size &&
            <ErrorMessage message={errors.size?.message} />
          }
        </Form.Group></Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Descricao">
              <Form.Control as="textarea" style={{ height: "160px" }} rows={6} {...register("descriptions")} />
            </FloatingLabel>
            {errors.descriptions && <ErrorMessage message={errors.descriptions?.message} />}
          </Form.Group>
        </Col>
      </Row>
      <Col />
      <Row>
        <Col>
          <BasicControls />
        </Col>
      </Row>
    </form>
  )
}