import React from 'react'
import { Table } from 'react-bootstrap'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import Paginate from '../../Components/Paginate'

export const ListTableStudents = ({ data, setParams, params, candidates=false }: any) => {

  const navigate = useNavigate();
  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  return (<div>
    <hr className="mg-y-30" />
    <div className="table-responsive">
      <Table striped hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Sexo</th>
            {!candidates ? <>
            <th>Turma</th>
            <th>Ano</th></> : <th>Curso desejado</th>}
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((student: any) => <tr onClick={() => navigate("/students/show/" + student?.id)}>
            <th scope="row">{student?.code ?? student?.entryCode}</th>
            <td>{student?.person?.fullName}</td>
            <td>{student?.person?.gender}</td>
            {!candidates ? <>
            <td>{student?.enrollment?.classe?.code}</td>
            <td>{student?.enrollment?.classe?.grade} º</td>
            </>: <td>{student?.desiredCourse?.name ?? '-'}</td>}
            <td>
              <Moment format="DD/MM/YYYY">
                {student.createdAt}
              </Moment></td>
          </tr>)}
        </tbody>
      </Table>
    </div>
    <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
  </div>
  )
}
