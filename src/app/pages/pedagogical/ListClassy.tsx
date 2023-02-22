import Moment from 'react-moment';
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useGetClassysData } from '../../api/pedagogical/classy';


export const ListClassy= () => {

  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 4, page: 1 });
  const {
    data,
    loading,
  } = useGetClassysData(params);
  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academicos</span>
        <span>Turmas</span>
        <span>Listagem</span>
      </div>
      <h2 className="az-content-title">Turmas</h2>
{JSON.stringify(data)}
      <div className='row'>
        <div className='col-md-6'>

          <div className="az-content-label mg-b-5">Simple Table</div>
          <p className="mg-b-20">Using the most basic table markup.</p>

        </div>
        <div className='col-md-6 text-right'>

          <Button
            variant="primary"
            disabled={loading}
            onClick={() => !loading ? navigate("/students/new/step1") : null}
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
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((classy: any) => <tr onClick={() => navigate("/students/show/" + classy?.id)}>
              <th scope="row">{classy.code}</th>
              <td>{classy?.descriptions}</td>
              <td>{classy?.person?.gender}</td>
              <td>
                <Moment format="DD/MM/YYYY">
                  {classy.createdAt}
                </Moment></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation">
        <div className="row">
          <div className="col-md-6">
            {data.page}/{data.pages} - {data.total} registos
          </div>
          <div className="col-md-6">
            <Paginate pages={data.pages} updateParams={updateParams} params={params} />
          </div>
        </div>
      </nav>
      <hr className="mg-y-30" />


    </div>
  )
}
const Paginate = ({ pages, updateParams, params }: any) => {

  let rows = [];
  for (let i = 0; i < pages; i++)
    rows.push(<li className={"page-item " + (params.page - 1 == i ? 'active' : '')}><button className="page-link" onClick={() => updateParams({ page: i + 1 })}>{i + 1}</button></li>)


  return (
    <ul className="pagination justify-content-end">
      <li className="page-item disabled">
        <button className="page-link" >Previous</button>
      </li>
      {rows}
      <li className="page-item">
        <a className="page-link" href="#">Next</a>
      </li>
    </ul>)
}