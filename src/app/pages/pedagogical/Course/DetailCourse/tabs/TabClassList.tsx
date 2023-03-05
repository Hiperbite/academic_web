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
    const persent = (classy: any) => Number((((classy?.activesEnrollments?.length ?? 1) / (classy?.classyRoom?.size ?? 1)) * 100).toFixed(2));;

    return (
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">

            <h2 className="az-content-title">Turmas</h2>

            <hr className="mg-y-30" />

            <div className="table-responsive">
                <table className="table table-striped mg-b-0">
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
                        {data?.data?.map((classy: any) => <tr onClick={() => navigate("/pedagogical/classy/" + classy?.id)}>
                            <th scope="row">{classy.code}</th>
                            <td>{classy?.descriptions}</td>
                            <td>{classy?.academicPeriod?.code ?? '-'}</td>
                            <td>{classy?.grade ? `${classy?.grade} º` : '-'}</td>
                            <td>{classy?.classyRoom?.code ?? '-'}</td>
                            <td>
                                {classy?.activesEnrollments?.length ?? '-'}/
                                {classy?.classyRoom?.size ?? '-'}</td>
                            <td>

                                <ProgressBar now={persent(classy)} label={`${persent(classy)}%`} />
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