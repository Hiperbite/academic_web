import Form from 'react-bootstrap/Form';
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Card, Col, FloatingLabel, Row } from "react-bootstrap";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../Components/ErrorMessage';

import useAxiosFetch, { services } from '../../../app/api/Api';
import { BasicControls } from '../../Components/Controls';
import { numericString } from '../../../helpers/form.helpers';
import { useUpdateClassRoomData } from '../../../app/api/pedagogical/classeRoom';

export const UpdateClassRoom = () => {

  const { id } = useParams()
  const { data } = useAxiosFetch(services.academic.classRoom + "/" + id)
  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academico</span>
        <span>Sala de aulas</span>
        <span>Actualizar</span>
        <span>#{data?.code}</span>
      </div>
      <h2 className="az-content-title">Actualizar Sala de aulas #{data?.code}</h2>
      <hr className="mg-y-30" />
      <div className="col-md-8 card-body">
        <ClassForm classRoom={data} />
      </div>
    </div>
  )
}


const FormSchema = z.object({
  code: z.string().min(3).max(20),
  descriptions: z.string().optional().nullable(),
  size: numericString(z.number().positive().max(1000)),
  isActive: z.boolean()

});
export const ClassForm = ({ classRoom }: any) => {
  const navigate = useNavigate();
  const { put, data, loading, success, error } = useUpdateClassRoomData();

  const { register, reset, handleSubmit,
    formState: { errors }, } = useForm({
      resolver: zodResolver(FormSchema)
    })

  const onSubmit = (form: any) => put({ ...form, ...{ id: classRoom?.id } })
  useEffect(() => {
    reset(classRoom);
  }, [classRoom, reset]);

  useMemo(() => {
    if (success) {
      navigate(`/pedagogical/class-rooms/${data?.id}`)
    }
  }, [success])
  return (<>
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
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Descricao">
                <Form.Control as="textarea" style={{ height: '120px' }} rows={6} {...register("descriptions")} />
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
        {error.length > 0 ?
          <Row>
            <Col>
              {error.map((err: any) =>
                <Alert key={'danger'} variant={'danger'}>
                  {err.message}
                </Alert>
              )}
            </Col>
          </Row>
          : null}
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
        <Link to={`/pedagogical/class-rooms/${data?.id}`}>Ver dados actualizados</Link>
        <br />
        <br />
        <br />
        <br />
      </Card.Body>
    </Card>
  )
}
