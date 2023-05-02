
import { useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Api } from '../../../../../app/api/Api';

import { UpdateStaff } from './UpdateStaff';

export const UpdateExistedStaff = () => {

  const { id } = useParams();
  const [staff, setStaff] = useState<any>({})

  useMemo(async () => {
    
    const { response: { data } } = await Api.get({ service: `/staffs/${id}?` });
    setStaff(data||{})
  }, [])

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Listagem</span>
      </div>
      <h1>Actualizar Pessoal</h1>
      <h2 className="az-content-title">#{staff?.code} - {staff?.person?.fullName}</h2>

      <hr className="mg-y-30" />

      <div className="card-body">
        <Row>
          <Col>
            {staff.id ? <UpdateStaff staff={staff} /> : null}
          </Col>
          <Col xs lg={4}></Col>
        </Row>
      </div>
    </div>
  )
}
