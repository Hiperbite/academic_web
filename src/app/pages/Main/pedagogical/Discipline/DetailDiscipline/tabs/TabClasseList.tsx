import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Modal, ProgressBar } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import useAxiosFetch, { Api, services } from "../../../../../app/api/Api";
import { Autocomplete } from "../../../../Components/Autocomplete";
import Paginate from "../../../../Components/Paginate";

export const TabClasseList = ({ discipline }: any) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[periodId]': discipline?.id });

    const { data, loading, isError } = useAxiosFetch(services.academic.class, params)
    const classes = discipline?.timeTables?.map(({ classe }: any) => classe)
    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }

    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <h2 className="az-content-title">Turmas</h2>
            <hr className="mg-y-30" />
            <div className="table-responsive">
                <table className="table table-striped mg-b-0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Descricao</th>
                            <th>Sala</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes?.map((classe: any) => <tr onClick={() => navigate("/pedagogical/classe/" + classe?.id)}>
                            <th scope="row">{classe.code}</th>
                            <td>{classe?.descriptions}</td>
                            <td>{classe?.classeRoom?.code ?? '-'}</td>
                            <td>
                                {classe?.enrollmentConfirmations?.length ?? '-'}/
                                {classe?.classeRoom?.size ?? '-'}</td>
                            <td>

                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />

        </div>
    </>)
}