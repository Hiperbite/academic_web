import { useMemo, useState } from "react";
import { Button, Col, Row} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { ListTableStaff } from '../components/ListTableStaff';
import { Api, services } from '../../../app/api/Api';

export const ListStaff = () => {

  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { isError }: any = {}
  useMemo(async () => {
    setLoading(true)
    const { response: { data: response } } = await Api.get({ service: services.staff.staff, params })
    setData(response)
    
    setLoading(false)
  }, [params])

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
      <h2 className="az-content-title">Pessoal</h2>
      <Row>
        <Col></Col>
        <Col className='text-right'>
          <Button
            variant="primary"
            disabled={loading}
            onClick={() => !loading ? navigate("/staffs/new/step1") : null}
          >
            {loading ? 'Loading…' : 'Registar'}
          </Button>
        </Col>
      </Row>
      <ListTableStaff setParams={setParams} params={params} data={data} />
    </div>
  )
}
