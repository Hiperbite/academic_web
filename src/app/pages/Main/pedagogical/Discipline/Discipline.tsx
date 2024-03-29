import { useMemo, useState } from "react";
import { Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import useAxiosFetch, { Api } from "../../../app/api/Api";
import { services } from "../../../app/api/Api";
import { allowed, AllowedFor } from "../../../app/api/auth/RequireAuth";
import Paginate from "../../Components/Paginate";


export const Discipline = () => {
  //const [data, setData] = useState({})
  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { isError }: any = {}
  useMemo(async () => {
    setLoading(true)
    const { response: { data: response } } = await Api.get({ service: services.academic.discipline, params })
    setData(response)

    setLoading(false)
  }, [params])

  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  const persent = (classRoom: any) => ((classRoom?.enrollmentConfirmations?.length ?? 1) / (classRoom?.classRoomRoom?.size ?? 1)) * 100;

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academicos</span>
        <span>Disciplinas</span>
        <span>Listagem</span>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <h2 className="az-content-title">Disciplinas acadêmicas</h2>
        </div>
        <div className='col-md-6 text-right'>
          <AllowedFor roles={'TABLES'} level={2}>
            <Button
              variant="primary"
              disabled={loading}
              onClick={() => !loading ? navigate("/pedagogical/disciplines/new") : null}
            >
              {loading ? 'Loading…' : 'Registar'}
            </Button>
          </AllowedFor>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((period: any) => <tr onClick={() => allowed('TABLES') ? navigate("/pedagogical/disciplines/" + period?.id) : null}>
              <th scope="row">{period.code}</th>
              <td>{period?.name}</td>
              <td style={{ maxWidth: "200px" }}>{period?.descriptions}</td>
              <td className="text-right">
                {period?.isActive ?
                  <button className="btn btn-success btn-sm">Activo</button> :
                  <button className="btn btn-danger btn-sm">Inactivo</button>}
              </td>
            </tr>)}
          </tbody>
        </table>

      </div>
      <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
    </div>
  )
}
