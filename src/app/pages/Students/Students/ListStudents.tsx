import Moment from 'react-moment';
import { useState } from "react";
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

import { useGetStudentsData } from '../../../app/api/students/students';
import { ListTableStudents } from '../components/ListTableStudents';

export const ListStudents = () => {

  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1, filter: 'withEnrollment' });
  const {
    data,
    loading,
  } = useGetStudentsData(params);


  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Inscritos</span>
        <span>Listagem</span>
      </div>
      <h2 className="az-content-title">Estudantes</h2>
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
