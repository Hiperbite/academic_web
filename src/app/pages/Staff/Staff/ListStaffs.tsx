import { useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

import { ListTableStaff } from '../components/ListTableStaff';
import { Api, services } from '../../../app/api/Api';

export const ListStaff = () => {


  const scope = new URLSearchParams(window.location.search).get('scope');

  const navigate = useNavigate();
  const [params, setParams] = useState<any>({ pageSize: 6, page: 1 });
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)

  useMemo(async () => {
    setLoading(true)
    const { response: { data: response } } = await Api.get({ service: services.staff.staff, params })
    setData(response)

    setLoading(false)
  }, [params])

  useMemo(async () => {
    if (scope) {
      setParams({ ...params, ...{ 'where[roles]': scope } })
    } else {

      delete (params ?? {})['where[roles]']
      setParams(params)
    }
  }, [scope])

  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Pessoal</span>
        <span>Listagem</span>
      </div>
      <Row>
        <Col>
          <h2 className="az-content-title">Pessoal</h2>
        </Col>
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
