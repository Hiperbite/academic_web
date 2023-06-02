import Form from 'react-bootstrap/Form';
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, FloatingLabel, Row } from "react-bootstrap";


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



import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

export const NewTicket = () => {

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Ticket</span>
        <span>Registar novo</span>
      </div>
      <h2 className="az-content-title">Registar Ticket</h2>

      <hr className="mg-y-30" />
      <div className="col-md-8 card-body">
        <TicketForm />
      </div>
      <hr />
      <hr />
      <hr />
      
    </div>
  )
}



const FormSchema = z.object({
  typeId: z.string().min(3).max(50),
  descriptions: z.string().optional()
});

export const TicketForm = () => {
  const navigate = useNavigate();
  const { data: ticket, loading, resolve } = useApi({ service: services.helpDesk.tickets.create });
  const { data: types, loading: loadingType } = useApi({ service: services.helpDesk.ticketTypes.getAll });

  const { register, handleSubmit, control,
    formState: { errors }, } = useForm({
      resolver: zodResolver(FormSchema)
    })
  useMemo(() => {
    if (ticket?.id) {
      toast.success('Ticket Criado com sucesso sob o codigo ' + ticket?.code)
      navigate('../list');
    }
  }, [ticket])
  const onSubmit = async (form: any) => {
    debugger
    resolve({ form })
  }

  return (<>
    <form onSubmit={handleSubmit(onSubmit)} >
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Tipo">

              <Form.Select aria-label="Default select example"
                {...register("typeId")}
              >
                <option value={undefined}>-</option>
                {types?.data?.map(({ id, code, descriptions }: any) => <option value={id}> {descriptions}</option>)}
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
                    data={''}

                    config={ { language:'pt', toolbar: [  'undo', 'redo', 'bold', 'italic','strikethrough' ,'|','link','numberedList', 'bulletedList' ] }}
                    onChange={( event, editor )=>
                      {
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

