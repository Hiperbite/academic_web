import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import Paginate from '../../../Components/Paginate'
import { Loading, Spinner } from '../../../Components/Snipper/Spinner'

import { DebounceInput } from 'react-debounce-input'

import _ from 'lodash'
export const ListTableStudents = ({ data, loading, setParams, params, candidates = false }: any) => {

  const navigate = useNavigate();
  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  return (<div>
    <Filter updateParams={updateParams} loading={loading} />
    <Table striped hover responsive>
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
      </tbody>
    </Table>
    <Loading loading={loading} />
    <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
  </div>
  )
}


export const Filter = ({ updateParams, loading }: any) => {
  const [state, setstate] = useState<number>()

  const { register, control, watch, handleSubmit,
    formState: { errors }, } = useForm({})
  const filter: any = _.pick(watch(), 'code', 'year', 'classeId', 'periodId')

  const onSubmit = (form: any) => null;//put({ ...form, ...{ id: classe?.id } })
  useEffect(() => {
    let newFilter: any = {}
    Object.keys(filter).forEach(key => newFilter[`where[${key}]`] = filter[key])

    if (!loading) {
      setstate(Math.random())
      updateParams(newFilter)
    }
  }, [JSON.stringify(filter)]);

  return (

    <form onSubmit={handleSubmit(onSubmit)} >
      <Row style={{ padding: "5px 0", boxShadow: "0 0 5px #ddd" }}>
        <Col md={3}>
          <Controller control={control}  {...register("code")}
            render={({
              field: { onChange, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) =>
              <DebounceInput
                className="form-control form-control-sm"
                placeholder="Nome ou Numero de estudante"
                minLength={3}
                value={value}
                debounceTimeout={500}
                onChange={onChange}
              />}
          />
        </Col>
        <Col md={2}>
          <Form.Select size="sm" aria-label="Default select example" {...register("classeId")} >
            <option>Turma</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select size="sm" aria-label="Default select example" {...register("periodId")} >
            <option>Periodo</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select size="sm" aria-label="Default select example" {...register("year")} >
            <option style={{ color: "#aaa" }}>Ano</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select size="sm" aria-label="Default select example">
            <option style={{ color: "#aaa" }}>Ano</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col md={1}>
          <Button variant="secondary" size="sm">x</Button>
        </Col>
      </Row>
    </form >
  )

}