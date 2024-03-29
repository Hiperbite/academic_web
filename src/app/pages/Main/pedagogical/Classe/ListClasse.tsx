import { useContext, useState } from "react";
import { Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../App";
import { useApi } from "../../../../app/api/apiSlice";
import { services } from "../../../../app/api/services";
import { AllowedFor } from "../../../app/api/auth/RequireAuth";
import Paginate from "../../../Components/Paginate";
import { ClassStaffGadgets } from "../../Dashboard/gadgets/ClassStaffGadgets";


export const ListClasse = () => {

  const { user }: any = useContext(AuthContext);
  const { data: { data: staff } = {} } = useApi({ service: services.staff.staff.get, params: { 'where[personId]': user?.personId, pageSize: 1 } })
  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });


  const { data, loading } = useApi({ service: services.academic.class.getAll, params })

  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  const persent = (classe: any) => Number((((classe?.activeEnrollments?.length ?? 1) / (classe?.classeRoom?.size ?? 1)) * 100).toFixed(2));;

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academicos</span>
        <span>Turmas</span>
        <span>Listagem</span>
      </div>


      <div className='row'>
        <div className='col-md-6'>
          <h2 className="az-content-title">Turmas</h2>
        </div>
        <div className='col-md-6 text-right'>
          <AllowedFor role={'CLASS'} level={2}>
            <Button
              variant="primary"
              disabled={loading}
              onClick={() => !loading ? navigate("/pedagogical/classe/new") : null}
            >
              {loading ? 'Loading…' : 'Registar'}
            </Button>
          </AllowedFor>
        </div>
      </div>

      {staff ? <ClassStaffGadgets staff={staff[0]} /> : null}
      <hr className="mg-y-30" />

      <div className="table-responsive">
        <table className="table table-striped table-hover mg-b-0">
          <thead>
            <tr>
              <th>No</th>
              <th>Curso</th>
              <th>Ano</th>
              <th>Turno</th>
              <th>Sala</th>
              <th colSpan={2}>Vagas</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((classe: any) => <tr onClick={() => navigate("/pedagogical/classe/" + classe?.id)}>
              <th scope="row">{classe.code}</th>
              <td>{classe?.course?.name}</td>
              <td>{classe?.grade ? `${classe?.grade} º` : '-'}</td>
              <td>{classe?.period?.descriptions ?? '-'}</td>
              <td>{classe?.classeRoom?.code ?? '-'}
                {classe?.classeRoom?.isActive ? '' : 'x'}
              </td>
              <td>
                {classe?.activeEnrollments?.length ?? '-'}/
                {classe?.classeRoom?.size ?? '-'}</td>
              <td>
                <ProgressBar now={persent(classe)} label={`${persent(classe)}%`} />
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
    </div>
  )
}
