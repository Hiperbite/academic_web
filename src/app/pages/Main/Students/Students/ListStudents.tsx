import Moment from 'react-moment';
import { useState } from "react";
import { Button, Col, OverlayTrigger, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

import { useGetStudentsData } from '../../../../app/api/students/students';
import { ListTableStudents } from '../components/ListTableStudents';
import { Loading } from '../../../Components/Snipper/Spinner';
import useAxiosFetch, { services } from '../../../../app/api/Api';
import { ListTableStudentEnrollment } from '../components/ListTableStudentEnrollment';


export const ListStudents = () => {

  const navigate = useNavigate();
  const [isShowFilter, showFilter] = useState<boolean>(false)
  const [params, setParams] = useState({ pageSize: 6, page: 1,scope:'', filter: 'withEnrollment', 'where[current]': true  });
    
  const { data, loading, isError } = useAxiosFetch(services.student.enrollment, params)

  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Inscritos</span>
        <span>Listagem</span>
      </div>
     
      <Row>
        <Col>
        <h2 className="az-content-title">Estudantes </h2></Col>
        <Col className='text-right'>
          <Button
            variant="secon"
            disabled={loading}
            onClick={() => showFilter(!isShowFilter)}
            aria-expanded={isShowFilter}
          >
            <i className='fa fa-search'></i>
          </Button>
          <Button
            variant="primary"
            disabled={loading}
            onClick={() => !loading ? navigate("/students/new/step1") : null}
          >
            {loading ? 'Loading…' : 'Registar'}
          </Button>
        </Col>
      </Row>
      <ListTableStudentEnrollment loading={loading} isShowFilter={isShowFilter} setParams={setParams} params={params} data={data} />
    </div>
  )
}
