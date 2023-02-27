import React, { useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterStudentData } from '../../../../../app/api/students/students'
import { Controls } from '../../../../Components/Controls'

export const Result = () => {
  const formData = useSelector((state: any) => state)
  const navigate = useNavigate();
  const student = { person: { ...formData, ...formData.person } }

  const { post, data, loading, error } = useRegisterStudentData();
  const current = 5
  const total = 5
  //useRegisterStudentData
  const onSubmit = () => {
    
    post(student);
    // eslint-disable-next-line react-hooks/rules-of-hooks

  };
  return (
    <>
      <Card>
        <Card.Body>
          <Spin loading={loading} />
          {JSON.stringify(error)}
          <hr/>
          {data.id
            ? <Success data={data} />
            : error.length > 0
              ? <Failed data={error} current={current} total={total} onSubmit={onSubmit} />
              : <Confirm data={student} current={current} total={total} onSubmit={onSubmit} />}

        </Card.Body>
      </Card>

    </>
  )
}

const Success = ({ data }: any) => {
  return (
    <div className='col-md-12 text-center'>
      <h4>
        Estudante inscrito com sucesso sob Numero de Inscricao:
      </h4>
      <h1>
        {data.code}
      </h1>
      <Link to={`/students/show/${data.id}`}>Ver dados</Link>
    </div>
  )
}
const Spin = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading ?
        <Spinner animation="border" role="status">
          <span className="visually-hidden" > Loading...</span >
        </Spinner > : <></>}
    </>
  );
}
const Failed = ({ data, current, total, onSubmit }: any) => {
  return (<>
    <pre>{JSON.stringify(data, null, 1)}</pre>
    <Controls current={current} total={total} onSubmit={onSubmit} />
  </>)
}

const Confirm = ({ data, current, total, onSubmit }: any) => {
  return (<>
    <pre>{JSON.stringify(data, null, 1)}</pre>
    <Controls current={current} total={total} onSubmit={onSubmit} />
  </>)
}