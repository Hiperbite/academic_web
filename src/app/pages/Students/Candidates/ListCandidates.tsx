
import { useState } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { useGetStudentsData } from '../../../app/api/students/students';
import { ListTableStudents } from '../components/ListTableStudents';

export const ListCandidates = () => {

  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 4, page: 1, filter: 'withNotEnrollment' });
  const {
    data,
    loading,
  } = useGetStudentsData(params);


  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Candidatos</span>
        <span>Listagem</span>
      </div>
      <h2 className="az-content-title">Candidatos Inscritos</h2>
      <Row>
        <Col></Col>
        <Col className='text-right'>
          <Button
            variant="primary"
            disabled={loading}
            onClick={() => !loading ? navigate("/students/new/step1") : null}
          >
            {loading ? 'Loading…' : 'Registar'}
          </Button>
        </Col>
      </Row>
      <ListTableStudents setParams={setParams} params={params} data={data} />
    </div>
  )
}
