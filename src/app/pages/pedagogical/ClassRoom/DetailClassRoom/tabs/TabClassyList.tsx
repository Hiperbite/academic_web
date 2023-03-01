import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Modal, ProgressBar, Table } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import useAxiosFetch, { Api, services } from "../../../../../app/api/Api";
import Paginate from "../../../../Components/Paginate";

export const TabClassyList = ({ classRoom }: any) => {

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[classyRoomId]': classRoom?.id });

    const { data, loading, isError } = useAxiosFetch(services.academic.class, params)

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }
    const persent = (classy: any) => ((classy?.enrollmentConfirmations?.length ?? 1) / (classy?.classyRoom?.size ?? 1)) * 100;

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
                        {data?.data?.map((classy: any) => <tr onClick={() => navigate("/pedagogical/classy/" + classy?.id)}>
                            <th scope="row">{classy.code}</th>
                            <td>{classy?.descriptions}</td>
                            <td>{classy?.academicPeriod?.code ?? '-'}</td>
                            <td>
                                {classy?.enrollmentConfirmations?.length ?? '-'}/
                                {classy?.classyRoom?.size ?? '-'}</td>
                            <td>
                                <ProgressBar now={persent(classy)} label={`${persent(classy)}%`} />
                            </td>
                            <td><Moment format="DD/MM/YYY">{classy?.createdAt}</Moment></td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
            <Paginate pages={data?.pages} updateParams={updateParams} params={params} />
        </div>
    </>)
}
