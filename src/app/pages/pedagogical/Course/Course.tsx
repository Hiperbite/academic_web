import { useMemo, useState } from "react";
import { Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import useAxiosFetch, { Api } from "../../../app/api/Api";
import { services } from "../../../app/api/Api";
import Paginate from "../../Components/Paginate";


export const Course = () => {
  //const [data, setData] = useState({})
  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { isError }: any = {}
  useMemo(async () => {
    setLoading(true)
    const { response: { data: response } } = await Api.get({ service: services.academic.course, params })
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
        <span>Cursos</span>
        <span>Listagem</span>
      </div>
      <h2 className="az-content-title">Cursos acadêmicas</h2>
      <div className='row'>
        <div className='col-md-6'>
        </div>
        <div className='col-md-6 text-right'>
          <Button
            variant="primary"
            disabled={loading}
            onClick={() => !loading ? navigate("/pedagogical/courses/new") : null}
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
              <th>Titulo</th>
              <th>Descricao</th>
              <th>Turmas</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((period: any) => <tr onClick={() => navigate("/pedagogical/courses/" + period?.id)}>
              <th scope="row">{period.code}</th>
              <td>{period?.name}</td>
              <td>{period?.descriptions}</td>
              <td>{period?.classys?.length}</td>
              <td>
                {period?.isActive ?
                  <button className="btn btn-success btn-sm">Activo</button> :
                  <button className="btn btn-danger btn-sm">Inactivo</button>}
              </td>
            </tr>)}
          </tbody>
        </table>

      </div>
        <Paginate pages={data?.pages} total={data?.total}  updateParams={updateParams} params={params} />
    </div>
  )
}
