
import Form from 'react-bootstrap/Form';
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Col, FloatingLabel, Row } from "react-bootstrap";

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../../Components/ErrorMessage';

import { BasicControls } from '../../Components/Controls';
import { useApi } from '../../../../app/api/apiSlice';
import { services } from '../../../../app/api/services';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export const UpdateEvent = () => {

  const { id } = useParams()

  const { data: event, loading, resolve } = useApi({ service: services.helpDesk.events.get, id })


  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academico</span>
        <span>Eventos</span>
        <span>Actualizar</span>
        <span>#{event?.code}</span>
      </div>
      <h2 className="az-content-title">Actualizar Evento #{event?.code}</h2>

      <hr className="mg-y-30" />

      <div className="col-md-8 card-body">
        {event?.id ? <EventForm event={event} /> : null}
      </div>
    </div>
  )
}


const FormSchema = z.object({
  id: z.string().min(3).max(50),
  typeId: z.string().min(3).max(50),
  descriptions: z.string()
});

export const EventForm = ({ event }: any) => {
  const navigate = useNavigate();
  const { data, loading, resolve } = useApi({ service: services.helpDesk.events.update });
  const { data: types, loading: loadingType } = useApi({ service: services.helpDesk.eventTypes.getAll });

  const { register, handleSubmit, control, reset,
    formState: { errors }, } = useForm({
      defaultValues: event,
      resolver: zodResolver(FormSchema),
    })
  useMemo(() => {
    reset(event)
  }, [event?.id])

  useMemo(() => {
    if (data?.id) {
      toast.success('Event actualizado com sucesso sob o codigo ' + event?.code)
      navigate('../'+data?.id);
    }
  }, [data])
  const onSubmit = async (form: any) => {
    debugger
    resolve({ form })
  }

  return (<form onSubmit={handleSubmit(onSubmit)} >
    {JSON.stringify(errors)}
    <Row>
      <Col md={8}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Título">

            <Form.Control aria-label="Default select example"
              {...register("title")} />
          </FloatingLabel>
          {errors.title &&
            <ErrorMessage message={errors.title?.message} />
          }
        </Form.Group>
      </Col>
      <Col></Col>
    </Row>
    <Row>
      <Col md={8}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Tipo">

            <Form.Select aria-label="Default select example"
              {...register("typeId")}
            >
              <option value={undefined}>-</option>
              {types?.data?.map(({ id, code, name }: any) => <option value={id}> {name}</option>)}
            </Form.Select>
          </FloatingLabel>
          {errors.typeId &&
            <ErrorMessage message={errors.typeId?.message} />
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
          </FloatingLabel>
          <Controller
            render={({
              field: { onChange, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) =>

              <CKEditor
                editor={ClassicEditor}
                data={value}

                config={{ language: 'pt', toolbar: ['undo', 'redo', 'bold', 'italic', 'strikethrough', '|', 'link', 'numberedList', 'bulletedList'] }}
                onChange={(event, editor) => {
                  debugger
                  onChange(editor.getData())
                }}
              />
            }
            control={control}
            {...register(`descriptions`)}
          />
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

  )
}


