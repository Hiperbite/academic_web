import moment from "moment";
import { useMemo, useState } from "react";
import { Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser'
import { useApi } from "../../../../app/api/apiSlice";
import { services } from "../../../../app/api/services";
import Paginate from "../../../Components/Paginate";
import './Ticket.scss'

const stateColors:any={
  Rejected:'danger',Pending:'default',Opened:'warning', Aproved:'primary', Done:'success'
}
export const Ticket = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });

  const { data, loading } = useApi({ service: services.helpDesk.tickets.getAll, params })

  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  return (
    <div id={'Ticket'} className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Help Desk</span>
        <span>Tickets</span>
        <span>Listagem</span>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <h2 className="az-content-title">Tickets</h2>
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
              <th>Descricao</th>
              <th>Turmas</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((ticket: any) => <tr onClick={() => navigate("../" + ticket?.id)}>
              <th scope="row">{ticket.code}</th>
              <td>{ticket?.type?.descriptions}
              </td>
              <td>
              <b>{ticket?.user?.person?.fullName}</b></td>
              <td>{ticket?.user?.username?.capitalize}</td>
              <td>{moment(ticket?.createdAt).fromNow()}</td>
              <td>
              <button style={{width:'100%'}} className={`btn btn-sm btn-${stateColors[ticket?.state?.code]}`}>{ticket?.state?.descriptions}</button>
                
                <ProgressBar animated style={{height:5}} now={Object.keys(stateColors).indexOf(ticket?.state?.code)*100/4} variant={stateColors[ticket?.state?.code]}/>
              </td>
            </tr>)}
          </tbody>
        </table>

      </div>
      <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
    </div>
  )
}
