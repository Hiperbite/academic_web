import React from 'react'
import { Badge, Table } from 'react-bootstrap'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import Paginate from '../../Components/Paginate'

export const ListTableStaff = ({ data, setParams, params }: any) => {

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
            <th></th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((staff: any) => <tr onClick={() => navigate("/staffs/show/" + staff?.id)}>
            <th scope="row">{staff?.enrollment?.code ?? staff?.code}</th>
            <td>{staff?.person?.firstName} {staff?.person?.otherName} {staff?.person?.lastName}</td>
            <td>{staff?.person?.gender}</td>
            <td>{(staff?.roles?.map((role:string)=><><Badge bg="primary">{role}</Badge>{' '}</>))}</td>
            <td>
              <Moment format="DD/MM/YYYY">
                {staff.createdAt}
              </Moment></td>
          </tr>)}
        </tbody>
      </Table>
    </div>
    <Paginate pages={data?.pages} updateParams={updateParams} params={params} />
  </div>
  )
}
