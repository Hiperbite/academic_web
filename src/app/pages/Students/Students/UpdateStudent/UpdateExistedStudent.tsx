
import { useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Api } from '../../../../app/api/Api';

import { UpdateStudent } from './UpdateStudent';

export const UpdateExistedStudent = () => {

  const { id } = useParams();
  const [student, setStudent] = useState<any>({})

  useMemo(async () => {
    debugger
    const { response: { data } } = await Api.get({ service: `/students/${id}?` });
    setStudent(data||{})
  }, [])

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Listagem</span>
      </div>
      <h1>Actualizar estudante</h1>
      <h2 className="az-content-title">#{student?.code ?? student?.entryCode} - {student?.person?.fullName}</h2>

      <hr className="mg-y-30" />

      <div className="card-body">
        <Row>
          <Col>
            {student.id ? <UpdateStudent student={student} /> : null}
          </Col>
          <Col xs lg={4}></Col>
        </Row>
      </div>
    </div>
  )
}
