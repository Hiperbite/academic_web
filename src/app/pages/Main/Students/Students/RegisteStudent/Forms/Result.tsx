import moment from 'moment'
import React from 'react'
import { Alert, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useApi } from '../../../../../../app/api/apiSlice'
import { services } from '../../../../../../app/api/services'
import { useRegisterStudentData } from '../../../../../../app/api/students/students'
import { TimeLine } from '../../../../../Common/Person/RegisterFrom/TimeLine'
import { Controls } from '../../../../../Components/Controls'
import { saveStep } from '../../../../Staff/Staff/RegisteStaff/rootSlice'

export const Result = () => {
  const dispatch = useDispatch()
  const step: any = 6;
  dispatch(saveStep(step))
  const formData = useSelector((state: any) => state)

  const student = { person: { ...formData, ...formData.person, ...formData.data, ...formData.contacts, ...formData?.person?.documents, ...formData?.documents, ...formData.address }, ...formData.data }
  const { person } = student
  const { documents, contacts, data, address: { birthPlaceAddress, livingAddress } }: any = person
  const { post, data: d, loading, error = [] } = useRegisterStudentData();
  const current = 6
  const total = 6

  const onSubmit = () => {
    post(student);
  };
  return (
    <>
      {error?.map((i: any) =>
        <Alert key={"danger"} variant={"danger"}>
          {i.message}
        </Alert>
      )}
      {d?.id ? <Success data={d} /> : null}
      <Card>
        <Card.Body>
          <Card.Title>Dados Pessoais</Card.Title>
          <Card.Text>
            <Row>
              <Col md={2}>Nome:</Col><Col>{person?.firstName} {person?.otherNames} {person?.lastName}</Col>
            </Row>
            <Row>
              <Col md={2}>Sexo:</Col><Col>{person?.gender}</Col>
            </Row>
            <Row>
              <Col md={2}>Estado civil:</Col><Col>{person?.maritalStatus}</Col>
            </Row>
            <Row>
              <Col md={2}>Nacionalidade:</Col><Col>{person?.nationality}</Col>
            </Row>
            <Row>
              <Col md={2}>Data de Nascimento:</Col><Col>{moment(person?.dirthDate).format('DD/MM/YYYY')}</Col>
            </Row>
          </Card.Text>
        </Card.Body>
        <hr />
        <Card.Body>
          <Card.Title>Endereços</Card.Title>
          <b>Local de Nascimento</b>
          <Card.Text>
            <Row>
              <Col md={2}>Endereço:</Col><Col>{birthPlaceAddress?.address}</Col>
            </Row>
            <Row>
              <Col md={2}>Cidade:</Col><Col>{birthPlaceAddress?.city}</Col>
            </Row>
            <Row>
              <Col md={2}>Província:</Col><Col>{birthPlaceAddress?.province}</Col>
            </Row>
          </Card.Text>
          <b>Local de Residência</b>
          <Card.Text>
            <Row>
              <Col md={2}>Endereço:</Col><Col>{livingAddress?.address}</Col>
            </Row>
            <Row>
              <Col md={2}>Cidade:</Col><Col>{livingAddress?.city}</Col>
            </Row>
            <Row>
              <Col md={2}>Província:</Col><Col>{livingAddress?.province}</Col>
            </Row>
          </Card.Text>
        </Card.Body>
        <hr />
        <Card.Body>
          <Card.Title>Documentos</Card.Title>
          <Card.Text>
            {documents.map(({ type, descriptions, issueDate, validationDate }: any) => <>
              <Row>
                <Col md={2}>Tipo:</Col><Col>{type}</Col>
              </Row>
              <Row>
                <Col md={2}>Número:</Col><Col>{descriptions}</Col>
              </Row>
              <Row>
                <Col md={2}>Data de Emissão:</Col><Col>{issueDate ? moment(issueDate).format('DD/MM/YYYY') : '-'}</Col>
              </Row>
              <Row>
                <Col md={2}>Data de Validade:</Col><Col>{validationDate ? moment(validationDate).format('DD/MM/YYYY') : '-'}</Col>
              </Row>
              <>-</>
            </>)}
          </Card.Text>
        </Card.Body>
        <hr />
        <Card.Body>
          <Card.Title>Contactos</Card.Title>
          <Card.Text>
            {contacts.map(({ type, descriptions, issueDate, validationDate }: any) => <>
              <Row>
                <Col md={2}>Tipo:</Col><Col>{type}</Col>
              </Row>
              <Row>
                <Col md={2}>Número:</Col><Col>{descriptions}</Col>
              </Row>
              <>-</>
            </>)}
          </Card.Text>
        </Card.Body>
        <hr />
        <Card.Body>
          <Card.Title>Outros</Card.Title>
          <Card.Text>
            <Row>
              <Col md={2}>Curso que pretende se candidatar:</Col><Col><DesiredCourseLabel desiredCourseId={data?.desiredCourseId} /></Col>
            </Row>
          </Card.Text>
        </Card.Body>
        <Card.Body>

          {d?.id
            ? <Success data={d} />
            : error?.length > 0
              ? <Failed data={error} current={current} total={total} onSubmit={onSubmit} />
              : <Confirm data={student} current={current} total={total} onSubmit={onSubmit} />}

        </Card.Body>
      </Card>

    </>
  )
}

const DesiredCourseLabel = ({ desiredCourseId: id }: any) => {

  const { data: { code, name } = {} } = useApi({ service: services.academic.course.getAll, id, params: { id } })


  return <>{code} - {name}</>
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