
import { useState } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { useGetStudentsData } from '../../../../app/api/students/students';
import { ListTableStudents } from '../components/ListTableStudents';


export const AllStudents = () => {

  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });
  const {
    data,
    loading,
  } = useGetStudentsData(params);


  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Todos</span>
        <span>Listagem</span>
      </div>
      <Row>
        <Col>
          <h2 className="az-content-title">Lista de todos registos</h2>
        </Col>
        <Col className='text-right'>
        </Col>
      </Row>
      <ListTableStudents loading={loading} setParams={setParams} params={params} data={data} />
    </div>
  )
}
