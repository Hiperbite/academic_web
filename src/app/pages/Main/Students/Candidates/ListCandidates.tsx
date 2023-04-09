
import { useState } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { useGetStudentsData } from '../../../../app/api/students/students';
import { AllowedFor } from "../../../app/api/auth/RequireAuth";
import { ListTableStudentCandidates } from "./ListTableStudentCandidates";

export const ListCandidates = () => {

  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1, where: {}, filter: 'withNotEnrollment' });
  const { data, loading } = useGetStudentsData(params);


  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Candidatos</span>
        <span>Listagem</span>
      </div>

      <Row>
        <Col>
          <h2 className="az-content-title">Candidatos Inscritos</h2>
        </Col>
        <Col className='text-right'>
          <AllowedFor role={'STUDENTS'} level={2}>
            <Button
              variant="primary"
              disabled={loading}
              onClick={() => !loading ? navigate("/students/new/step1") : null}
            >
              {loading ? 'Loading…' : 'Registar'}
            </Button>
          </AllowedFor>
        </Col>
      </Row>
      <ListTableStudentCandidates loading={loading} setParams={setParams} candidates={true} params={params} data={data} />
    </div>
  )
}
