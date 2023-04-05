import { useState } from "react";
import { ProgressBar, Table } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import useAxiosFetch, { services } from "../../../../../../app/api/Api";
import { allowed } from "../../../../../app/api/auth/RequireAuth";
import Paginate from "../../../../../Components/Paginate";

export const TabClasseList = ({ classRoom }: any) => {

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[classeRoomId]': classRoom?.id });

    const { data, loading, isError } = useAxiosFetch(services.academic.class, params)

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }
    const persent = (classe: any) => ((classe?.activeEnrollments?.length ?? 1) / (classe?.classeRoom?.size ?? 1)) * 100;

    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <h2 className="az-content-title">Turmas</h2>

            <hr className="mg-y-30" />
            <div className="table-responsive">
                <Table hover striped>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Descricao</th>
                            <th>Periodo</th>
                            <th colSpan={2}>Vagas</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((classe: any) => <tr onClick={() => allowed('CLASS') ? navigate("/pedagogical/classe/" + classe?.id) : null}>
                            <th scope="row">{classe.code}</th>
                            <td>{classe?.descriptions}</td>
                            <td>{classe?.period?.descriptions ?? '-'}</td>
                            <td>
                                {classe?.activeEnrollments.length ?? '-'}/
                                {classe?.classeRoom?.size ?? '-'}</td>
                            <td>
                                <ProgressBar now={persent(classe)} label={`${persent(classe)}%`} />
                            </td>
                            <td><Moment format="DD/MM/YYY">{classe?.createdAt}</Moment></td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
            <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
        </div>
    </>)
}
