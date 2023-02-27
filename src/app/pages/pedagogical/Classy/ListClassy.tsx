import { useState } from "react";
import { Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../app/api/Api";
import { services } from "../../../app/api/Api";
import Paginate from "../../Components/Paginate";


export const ListClassy = () => {
  //const [data, setData] = useState({})
  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });


  const { data, loading, isError } = useAxiosFetch(services.academic.class, params)

  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  const persent = (classy: any) => ((classy?.enrollmentConfirmations?.length ?? 1) / (classy?.classyRoom?.size ?? 1)) * 100;
  
  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academicos</span>
        <span>Turmas</span>
        <span>Listagem</span>
      </div>
      
      <h2 className="az-content-title">Turmas</h2>
      <div className='row'>
        <div className='col-md-6'>

          <div className="az-content-label mg-b-5">Simple Table</div>
          <p className="mg-b-20">Using the most basic table markup.</p>

        </div>
        <div className='col-md-6 text-right'>

          <Button
            variant="primary"
            disabled={loading}
            onClick={() => !loading ? navigate("/pedagogical/classy/new") : null}
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
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((classy: any) => <tr onClick={() => navigate("/pedagogical/classy/" + classy?.id)}>
              <th scope="row">{classy.code}</th>
              <td>{classy?.descriptions}</td>
              <td>{classy?.classyRoom?.code ?? '-'}</td>
              <td>
                {classy?.enrollmentConfirmations?.length ?? '-'}/
                {classy?.classyRoom?.size ?? '-'}</td>
              <td>

                <ProgressBar now={persent(classy)} label={`${persent(classy)}%`} />
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation">
        <div className="row">
          <div className="col-md-6">
            {data?.page}/{data?.pages} - {data?.total} registos
          </div>
          <div className="col-md-6">
            <Paginate pages={data?.pages} updateParams={updateParams} params={params} />
          </div>
        </div>
      </nav>
    </div>
  )
}
