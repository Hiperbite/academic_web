import moment from "moment";
import { useMemo, useState } from "react";
import { Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser'
import { useApi } from "../../../../app/api/apiSlice";
import { services } from "../../../../app/api/services";
import Paginate from "../../../Components/Paginate";
import './Event.scss'

const stateColors:any={
  Rejected:'danger',Pending:'default',Opened:'warning', Aproved:'primary', Done:'success'
}
export const Event = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });

  const { data, loading } = useApi({ service: services.helpDesk.events.get, params })

  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  return (
    <div id={'Ticket'} className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Help Desk</span>
        <span>Eventos</span>
        <span>Listagem</span>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <h2 className="az-content-title">Eventos</h2>
        </div>
        <div className='col-md-6 text-right'>
          <Button
            variant="primary"
            disabled={loading}
            onClick={() => !loading ? navigate("../new") : null}
          >
            {loading ? 'Loading…' : 'Registar'}
          </Button>
        </div>
      </div>

      <hr className="mg-y-30" />

      <div className="table-responsive">
        <table className="table table-striped table-hover mg-b-0">
          <thead>
            <tr>
              <th>No</th>
              <th>Titulo</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((event: any) => <tr onClick={() => navigate("../" + event?.id)}>
              <th scope="row">{event.code}</th>
              <td>{event?.type?.name}</td>
              <td>{moment(event?.createdAt).fromNow()}</td>
            </tr>)}
          </tbody>
        </table>

      </div>
      <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
    </div>
  )
}
