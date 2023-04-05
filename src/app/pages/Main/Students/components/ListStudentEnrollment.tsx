import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Collapse, Form, Popover, Row, Table } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import Paginate from '../../../Components/Paginate'
import { Loading, Spinner } from '../../../Components/Snipper/Spinner'

import { DebounceInput } from 'react-debounce-input'

import _ from 'lodash'
import useAxiosFetch, { services } from '../../../../app/api/Api'
import { ListTableStudentEnrollment } from '../Students/components/ListTableStudentEnrollment'
export const ListStudentEnrollment = ({ data, isShowFilter, loading, setParams, params, candidates = false }: any) => {

  const navigate = useNavigate();
  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  return (<div>
   
      <Filter isShowFilter updateParams={updateParams} loading={loading} />
      <Loading loading={loading} />
    <div className="table-responsive">

      {data?.data ? <ListTableStudentEnrollment enrollments={data?.data} /> : null}
    </div>

    <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
  </div>
  )
}


const Filter = ({ updateParams, params: pp, loading }: any) => {
  const [state, setstate] = useState<number>()

  const [params, setParams] = useState({ pageSize: 100, page: 1 });

  const { data: classes } = useAxiosFetch(services.academic.class, params)
  const { data: periods } = useAxiosFetch(services.academic.period, params)

  const { register, control, watch, handleSubmit,
    formState: { errors }, } = useForm({})
  let filter: any = _.pick(watch(), 'code', 'year', 'classeId', 'name', 'periodId')

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
          <Controller control={control}  {...register("code")}
            render={({
              field: { onChange, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) =>
              <DebounceInput
                className="form-control form-control-sm"
                placeholder="Numero de estudante"
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
          <Form.Select size="sm" aria-label="Default select example" {...register("classeId")} >
            <option value={"*"}>[ Turma ]</option>
            {classes?.data?.map(({ id, code }: any) => <option value={id}>{code}</option>)}

          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select size="sm" aria-label="Default select example" {...register("periodId")} >
            <option value={"*"} >Periodo</option>
            {periods?.map(({ id, code, descriptions }: any) => <option value={id}>{code} - {descriptions}</option>)}
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select size="sm" aria-label="Default select example" {...register("year")} >
            <option style={{ color: "#aaa" }}>Ano</option>
            {[1, 2, 3, 4, 5, 6].map((y: any) => <option value={y}>{y}º</option>)}
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>

      </Row>
    </form >
  )

}