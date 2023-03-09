import { useState } from "react";
import { Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../app/api/Api";
import { services } from "../../../app/api/Api";
import Paginate from "../../Components/Paginate";


export const ListClassRoom = () => {
  //const [data, setData] = useState({})
  const navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 6, page: 1 });


  const { data, loading, isError } = useAxiosFetch(services.academic.classRoom, params)

  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }
  const persent = (classRoom: any) => ((classRoom?.enrollmentConfirmations?.length ?? 1) / (classRoom?.classRoomRoom?.size ?? 1)) * 100;

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Academicos</span>
        <span>Salas de aulas</span>
        <span>Listagem</span>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <h2 className="az-content-title">Salas de aulas</h2>
        </div>
        <div className='col-md-6 text-right'>
          <Button
            variant="primary"
            disabled={loading}
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
              <th>Lugares</th>
              <th colSpan={2}>Turmas</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((classRoom: any) => <tr onClick={() => navigate("/pedagogical/class-rooms/" + classRoom?.id)}>
              <th scope="row">{classRoom.code}</th>
              <td>{classRoom?.descriptions}</td>
              <td>{classRoom?.size ?? '-'}</td>
              <td>{classRoom?.classes.length}</td>
              <td className="text-right">
                {classRoom?.isActive ?
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
