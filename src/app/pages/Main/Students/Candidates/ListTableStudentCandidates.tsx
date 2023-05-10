import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import Paginate from '../../../Components/Paginate'
import { Loading, Spinner } from '../../../Components/Snipper/Spinner'

import { DebounceInput } from 'react-debounce-input'


import _ from 'lodash'
import useAxiosFetch, { services } from '../../../app/api/Api'
export const ListTableStudentCandidates = ({ data, loading, setParams, params, candidates = false }: any) => {

  const navigate = useNavigate();
  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  return (<div>
    <Filter updateParams={updateParams} loading={loading} />

    <Table striped hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Sexo</th>
          {!candidates ? <>
            <th>Turma</th>
            <th>Ano</th></> : <th>Curso desejado</th>}
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {data?.data?.map((student: any) => <tr onClick={() => navigate("/students/show/" + student?.id)}>
          <th scope="row">{student?.code ?? student?.entryCode}</th>
          <td>{student?.person?.fullName}</td>
          <td>{student?.person?.gender}</td>
          {!candidates ? <>
            <td>{student?.enrollment?.classe?.code}</td>
            <td>{student?.enrollment?.classe?.grade} º</td>
          </> : <td>{student?.desiredCourse?.name ?? '-'}</td>}
          <td>
            <Moment format="DD/MM/YYYY">
              {student.createdAt}
            </Moment></td>
        </tr>)}

        {data?.data?.length === 0 ? <tr>
          <td colSpan={6} className='text-center'>
            <i className='fa fa-exclamation'></i> {' '}sem registos
          </td>
        </tr> : null}
      </tbody>
    </Table>
    <Loading loading={loading} />

    <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
  </div>
  )
}


const Filter = ({ updateParams, params: pp, loading }: any) => {
  const [state, setstate] = useState<number>()

  const [params, setParams] = useState({ pageSize: 100, page: 1 });

  const { data: courses, loading: l }: any = useAxiosFetch(services.academic.course, params)

  const { register, control, watch, handleSubmit,
    formState: { errors }, } = useForm({})
  let filter: any = _.pick(watch(), 'entryCode', 'createdAt', 'desiredCourseId', 'name', 'gender')

  const onSubmit = (form: any) => null;
  useEffect(() => {
    let newFilter: any = {}
    Object.keys(filter).forEach(key => newFilter[`where[${key}]`] = filter[key])
    if (!loading) {
      updateParams(newFilter)
    }
  }, [JSON.stringify(watch())]);

  return (

    <form onSubmit={handleSubmit(onSubmit)} >
      <Row style={{ padding: "5px 0", boxShadow: "0 0 5px #ddd" }}>
        <Col md={2}>
          <Controller control={control}  {...register("entryCode")}
            render={({
              field: { onChange, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) =>
              <DebounceInput
                className="form-control form-control-sm"
                placeholder="Numero de candidatura"
                minLength={3}
                value={value}
                debounceTimeout={500}
                onChange={onChange}
              />}
          />
        </Col><Col md={4}>
          <Controller control={control}  {...register("name")}
            render={({
              field: { onChange, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) =>
              <DebounceInput
                className="form-control form-control-sm"
                placeholder="Nome"
                minLength={3}
                value={value}
                debounceTimeout={500}
                onChange={onChange}
              />}
          />
        </Col>
        <Col md={2}>
          <Form.Select size="sm" aria-label="Default select example" {...register("gender")} >
            <option value={"*"} >[ Sexo ]</option>
            {[['Masculino', 'M'], ['Feminino', 'F']].map(([gen, code]: any) => <option value={`${code}`}>{gen}</option>)}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select size="sm" aria-label="Default select example" {...register("desiredCourseId")} >
            <option value={"*"} >[ Curso inscrito ]</option>
            {courses?.data?.map(({ id, code, name }: any) => <option value={id}>{code} - {name}</option>)}
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Control placeholder='[ Data de inscrição ]' size="sm" type="date" aria-label="Default select example" {...register("createdAt")} />
        </Col>

      </Row>
    </form >
  )

}