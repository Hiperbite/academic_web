import { Col, Row } from "react-bootstrap";
import { RegisterStudent } from './RegisterStudent';

export const RegisterNewStudent = () => {
  
  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Candidatos</span>
        <span>Listagem</span>
      </div>

      <h1>Inscrever novo estudante</h1>

      <div className="card-body">
        <Row>
          <Col>
            <hr className="mg-y-30" />
            <RegisterStudent />
          </Col>
        </Row>

      </div>


    </div>
  )
}
