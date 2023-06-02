import Form from 'react-bootstrap/Form';
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Col, FloatingLabel, Row } from "react-bootstrap";


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { BasicControls } from '../../Components/Controls';
import { useApi } from '../../../../app/api/apiSlice';
import { services } from '../../../../app/api/services';
import DatePicker from 'react-date-picker';
import moment from 'moment';

export const NewEventSchedule = () => {

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>EventScheduleo</span>
        <span>Registar novo</span>
      </div>
      <h2 className="az-content-title">Registar EventScheduleo</h2>

      <hr className="mg-y-30" />
      <div className="col-md-8 card-body">
        <EventScheduleForm />
      </div>
      <hr />
      <hr />
      <hr />

    </div>
  )
}

const FormSchema = z.object({
  privacy: z.string().min(0).max(5),
  end: z.date(),
  start: z.date().min(new Date()),
  eventId: z.string().min(3).max(50),
  descriptions: z.string().optional()
});

export const EventScheduleForm = ({ event , setRefresh, handleClose}: any) => {
  const navigate = useNavigate();
  const { data: schedule, loading, resolve, error } = useApi({ service: services.helpDesk.eventSchedules.create });

  const defaultValues: any = { eventId: event?.id }
  const { register, handleSubmit, control, reset,
    formState: { errors }, } = useForm({
      defaultValues,
      resolver: zodResolver(FormSchema)
    })
  useMemo(() => {
    if (schedule?.id) {
      toast.success('Evento Agendado sucesso sob o codigo ' + schedule?.code)
      setRefresh(schedule?.id)
      handleClose()
    }
  }, [schedule])
  const onSubmit = async (form: any) => {
    debugger
    resolve({ form })
  }

  return (<>
    <form onSubmit={handleSubmit(onSubmit)} >
      {JSON.stringify(error)} - 
      {JSON.stringify(errors.eventId)}
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Data de Inicio"
              className="mb-3">
              <Controller
                render={({
                  field: { onChange, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => <DatePicker
                    minDate={(new Date())}
                    maxDate={(new Date(new Date().setFullYear(new Date().getFullYear() + 50)))}
                    clearIcon={null} format="dd/MM/yyyy" className="form-control" onChange={onChange} value={value ? moment(value).toDate() : null} />}
                control={control}
                {...register("start")}
              />
            </FloatingLabel>
            {errors.start &&
              <ErrorMessage message={errors.start?.message} />
            }
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Data de Fim"
              className="mb-3">
              <Controller
                render={({
                  field: { onChange, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => <DatePicker
                    minDate={(new Date())}
                    maxDate={(new Date(new Date().setFullYear(new Date().getFullYear() + 50)))}
                    clearIcon={null} format="dd/MM/yyyy" className="form-control" onChange={onChange} value={value ? moment(value).toDate() : null} />}
                control={control}
                {...register("end")}
              />
            </FloatingLabel>
            {errors.end &&
              <ErrorMessage message={errors.end?.message} />
            }
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Privacidade</Form.Label>
            <Form.Range min={0} max={5} step={1} aria-label="Default select example"
              {...register("privacy")} />
            {errors.privacy &&
              <ErrorMessage message={errors.privacy?.message} />
            }
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label controlId="floatingInput">Descrição
            </Form.Label>
            <Controller
              render={({
                field: { onChange, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) =>

                <CKEditor
                  editor={ClassicEditor}
                  data={''}

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
  </>
  )
}

