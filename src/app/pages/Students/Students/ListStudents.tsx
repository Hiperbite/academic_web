import Moment from 'react-moment';
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

import { useGetStudentsData } from '../../../api/students/students';

export const ListStudents = () => {

  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 4, page: 1 });
  const {
    data,
    loading,
  } = useGetStudentsData(params);
  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Candidatos</span>
        <span>Listagem</span>
      </div>
      <h2 className="az-content-title">Candidatos Inscritos</h2>

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
              <th>Name</th>
              <th>Sexo</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((student: any) => <tr onClick={() => navigate("/students/show/" + student?.id)}>
              <th scope="row">{student.code}</th>
              <td>{student?.person?.firstName} {student?.person?.otherName} {student?.person?.lastName}</td>
              <td>{student?.person?.gender}</td>
              <td>
                <Moment format="DD/MM/YYYY">
                  {student.createdAt}
                </Moment></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <Paginate pages={data.pages} updateParams={updateParams} params={params} />

      <hr className="mg-y-30" />


    </div>
  )
}

const Paginate = ({ pages, updateParams, params }: any) => {

  let rows = [];
  for (let i = 0; i < pages; i++)
    rows.push(<li className={"page-item " + (params.page - 1 == i ? 'active' : '')}><button className="page-link" onClick={() => updateParams({ page: i + 1 })}>{i + 1}</button></li>)


  return (
    <nav aria-label="Page navigation">
      <div className="row">
        <div className="col-md-6">
          {params.page}/{pages} - {params.total} registos
        </div>
        <div className="col-md-6">

          <ul className="pagination justify-content-end">
            <li className="page-item disabled">
              <button className="page-link" >Previous</button>
            </li>
            {rows}
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>


        </div>
      </div>
    </nav>)
}