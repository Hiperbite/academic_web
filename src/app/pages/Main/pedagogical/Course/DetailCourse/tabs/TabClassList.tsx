import {  useMemo, useState } from "react";
import {  ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Api, services } from "../../../../../app/api/Api";
import Paginate from "../../../../Components/Paginate";

export const TabClassList = ({ course }: any) => {

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[courseId]': course?.id });
    const [data, setData] = useState<any>()
    useMemo(async () => {
        const { response: { data: response } } = await Api.get({ service: services.academic.class, params })
        setData(response)
    }, [params])


    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }
    const persent = (classe: any) => Number((((classe?.activeEnrollments?.length ?? 1) / (classe?.classeRoom?.size ?? 1)) * 100).toFixed(2));;

    return (
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">

            <h2 className="az-content-title">Turmas</h2>

            <hr className="mg-y-30" />

            <div className="table-responsive">
                <table className="table table-striped table-hover mg-b-0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Descricao</th>
                            <th>Turno</th>
                            <th>Ano</th>
                            <th>Sala</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((classe: any) => <tr onClick={() => navigate("/pedagogical/classe/" + classe?.id)}>
                            <th scope="row">{classe.code}</th>
                            <td>{classe?.descriptions}</td>
                            <td>{classe?.period?.code ?? '-'}</td>
                            <td>{classe?.grade ? `${classe?.grade} º` : '-'}</td>
                            <td>{classe?.classeRoom?.code ?? '-'}</td>
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
            <nav aria-label="Page navigation">
                <div className="row">
                    <Paginate total={data?.total} pages={data?.pages} updateParams={updateParams} params={params} />
                </div>
            </nav>
        </div>
    )
}