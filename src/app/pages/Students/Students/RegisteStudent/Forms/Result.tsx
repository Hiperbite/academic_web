import React from 'react'
import { Alert, Card, ListGroup, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRegisterStudentData } from '../../../../../app/api/students/students'
import { Controls } from '../../../../Components/Controls'

export const Result = () => {
  const formData = useSelector((state: any) => state)
  const student = { person: { ...formData, ...formData.person, ...formData.data,...formData.contacts,...formData?.person?.documents,...formData?.documents,...formData.address }, ...formData.data }

  const { post, data, loading, error = [] } = useRegisterStudentData();
  const current = 6
  const total = 6

  const onSubmit = () => {
    post(student);
  };
  return (
    <>
      <Card>
        <Card.Body>

          <h2>Confirmar e gravar</h2>
          <hr />
          <pre>{JSON.stringify(student,null,1)}</pre>
            {error?.map((i: any) => 
              <Alert key={"danger"} variant={"danger"}>
                {i.message}
              </Alert>
            )}

          
          {data.id
            ? <Success data={data} />
            : error?.length > 0
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

    <Controls current={current} total={total} onSubmit={onSubmit} />
  </>)
}

const Confirm = ({ data, current, total, onSubmit }: any) => {
  return (<>
    <Controls current={current} total={total} onSubmit={onSubmit} />
  </>)
}