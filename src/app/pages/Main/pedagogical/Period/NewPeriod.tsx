import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Col, FloatingLabel, ProgressBar, Row } from "react-bootstrap";

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../Components/ErrorMessage';

import useAxiosFetch, { services } from '../../../app/api/Api';
import { BasicControls } from '../../Components/Controls';
import { useRegisterPeriodData, useUpdateperiodData } from '../../../app/api/pedagogical/period';

export const UpdatePeriod = () => {

  const { id } = useParams()
  const { data } = useAxiosFetch(services.academic.period + "/" + id)
  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academico</span>
        <span>Turno</span>
        <span>Actualizar</span>
        <span>#{data?.code}</span>
      </div>
      <h2 className="az-content-title">Registar Turno #{data?.code}</h2>

      <div className="az-content-label mg-b-5">Simple Table</div>
      <p className="mg-b-20">Using the most basic table markup.</p>

      <hr className="mg-y-30" />

      <div className="col-md-8 card-body">

        <PeriodForm period={data} />
      </div>


    </div>
  )
}



const FormSchema = z.object({
  code: z.string().min(2).max(20),
  descriptions: z.string().optional(),
  isActive: z.boolean()

});
export const PeriodForm = ({ period }: any) => {

  const useMyHook = period?.id ? useUpdateperiodData : useRegisterPeriodData
  const { put, post, data, loading, success, error } = useMyHook();

  const { register, reset, handleSubmit,
    formState: { errors }, } = useForm({
      resolver: zodResolver(FormSchema)
    })

  const onSubmit = (form: any) => {
    alert('submit')
    period?.id ? put({ ...form, ...{ id: period?.id } }) : post({ ...form, ...{ id: period?.id } })
  }
  useEffect(() => {
    reset(period);
  }, [period, reset]);

  useEffect(() => {
    if (success) {
      toast.success("Turma actualizada com sucesso!")
    }
  }, [data, success])
  return (<>

    {success ? <MessageScreen message={"Turma registada com successo"} data={period} status={'success'} /> : null}
    {!success ?
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
        <Link to={`/pedagogical/periods/${data?.id}`}>Ver dados actualizados</Link>
        <br />
        <br />
        <br />
        <br />
      </Card.Body>
    </Card>
  )
}
