
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetStudentData } from '../../../../app/api/students/students';
import { UpdateStudent } from './UpdateStudent';

export const UpdateExistedStudent = () => {

  const { id } = useParams();
  const {
    data: student,
    loading,
  } = useGetStudentData({ id });



  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Listagem</span>
      </div>
      <h1>Actualizar estudante</h1>
      <h2 className="az-content-title">#{student?.enrollment?.code ?? student?.code}</h2>

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
