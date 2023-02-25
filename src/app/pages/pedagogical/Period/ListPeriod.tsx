import { useState } from "react";
import { Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../api/Api";
import { services } from "../../../api/Api";
import Paginate from "../../Components/Paginate";


export const ListPeriod = () => {
  //const [data, setData] = useState({})
  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });


  const { data, loading, isError } = useAxiosFetch(services.academic.period, params)

  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  const persent = (classRoom: any) => ((classRoom?.enrollmentConfirmations?.length ?? 1) / (classRoom?.classRoomRoom?.size ?? 1)) * 100;

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academicos</span>
        <span>Turnos</span>
        <span>Listagem</span>
      </div>
      <h2 className="az-content-title">Turnos</h2>
      <div className='row'>
        <div className='col-md-6'>

          <div className="az-content-label mg-b-5">Simple Table</div>
          <p className="mg-b-20">Using the most basic table markup.</p>

        </div>
        <div className='col-md-6 text-right'>

          <Button
            variant="primary"
            disabled={true}
            onClick={() => !loading ? navigate("/pedagogical/class-rooms/new") : null}
          >
            {loading ? 'Loading…' : 'Registar'}
          </Button>
        </div>
      </div>

      <hr className="mg-y-30" />

      <div className="table-responsive">
        <table className="table table-striped mg-b-0">
          <thead>
            <tr>
              <th>No</th>
              <th>Descricao</th>
              <th>Sala</th>
              <th>Turmas</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((period: any) => <tr onClick={() => navigate("/pedagogical/periods/" + period?.id)}>
              <th scope="row">{period.code}</th>
              <td>{period?.descriptions}</td>
              <td>{period?.classys.length}</td>
              <td>
                {period?.isActive ?
                  <button className="btn btn-success btn-sm">Activo</button> :
                  <button className="btn btn-danger btn-sm">Inactivo</button>}
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
