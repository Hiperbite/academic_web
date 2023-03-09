
import Form from 'react-bootstrap/Form';
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, FloatingLabel,  Row } from "react-bootstrap";

import { toast } from 'react-toastify';

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../Components/ErrorMessage';

import { BasicControls } from '../../Components/Controls';
import { Api, services } from '../../../app/api/Api';


export const UpdateDiscipline = () => {

  const { id } = useParams()

  const [discipline, setDiscipline] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  useMemo(async () => {
    setLoading(true)
    const { response: { data: response } } = await Api.get({ service: services.academic.discipline, id })
    setDiscipline(response)
    setLoading(false)
  }, [])

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academico</span>
        <span>Disciplina</span>
        <span>Actualizar</span>
        <span>#{discipline?.code}</span>
      </div>
      <h2 className="az-content-title">Actualizar Disciplina #{discipline?.code}</h2>

      <hr className="mg-y-30" />

      <div className="col-md-8 card-body">

        {discipline ? <DisciplineForm discipline={discipline} /> : null }
      </div>


    </div>
  )
}



const FormSchema = z.object({
  name: z.string().min(3).max(20),
  descriptions: z.string().optional(),
  isActive: z.boolean()

});

export const DisciplineForm = ({discipline}:any) => {

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { register, handleSubmit,
    formState: { errors }, } = useForm({
      defaultValues:discipline,
      resolver: zodResolver(FormSchema)
    })

  const onSubmit = async (form: any) => {
    setLoading(true)
    const { response: { data: response, status } } = await Api.put({ service: services.academic.discipline, data: {...form, id:discipline.id} })
    setData(response)
    if(status === 200) {
      toast.success("Disciplina actualziada com sucesso!")
      navigate(`/pedagogical/disciplines/${discipline?.id}`)
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
                  <Form.Control as="textarea" rows={6}  style={{height:"160px"}} {...register("descriptions")} />
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

