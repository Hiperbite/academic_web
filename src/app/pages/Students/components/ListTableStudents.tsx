import React from 'react'
import { Table } from 'react-bootstrap'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import Paginate from '../../Components/Paginate'

export const ListTableStudents = ({ data, setParams, params }: any) => {

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
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((student: any) => <tr onClick={() => navigate("/students/show/" + student?.id)}>
            <th scope="row">{student?.enrollment?.code ?? student?.code}</th>
            <td>{student?.person?.firstName} {student?.person?.otherName} {student?.person?.lastName}</td>
            <td>{student?.person?.gender}</td>
            <td>{JSON.stringify(student?.enrollment?.current)}</td>
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
