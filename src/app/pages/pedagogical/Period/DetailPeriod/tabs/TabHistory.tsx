import { useState } from "react";
import { Button, Card, ListGroup, Badge, Row, Col, Collapse, Table } from "react-bootstrap"
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import useAxiosFetch, { services } from "../../../../../app/api/Api";
import Paginate from "../../../../Components/Paginate"

export const TabHistory = ({ modelName, objectId }: any) => {
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[model]': modelName, 'where[ref]': objectId });

    const { data, loading, isError } = useAxiosFetch(services.common.track, params)

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }


    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <h2 className="az-content-title">Histórico de Actualização</h2>

            <div className='row'>
                <div className='col-md-6'>
                    <div className="az-content-label mg-b-5 hidden">Simple Table</div>
                    <p className="mg-b-20 hidden">Using the most basic table markup.</p>

                </div>
                <div className='col-md-6 text-right'>

                </div>
            </div>

            <hr className="mg-y-30" />
            <div className="table-responsive">
                <ListGroup variant="flush">
                    {data?.data?.map((track: any) => <HistoryItem item={track} />)}
                </ListGroup>
            </div>
            <Paginate pages={data?.pages} updateParams={updateParams} params={params} />
        </div>
    </>)
}

const HistoryItem = ({ item }: any) => {

    const [open, setOpen] = useState(false);
    let i = 1;
    return (
        <>
            <ListGroup.Item
                as="li" onClick={() => setOpen(!open)}
            >
                <Row style={{ width: "100%" }}>
                    <Col xs={1} md={1} lg={1}></Col>
                    <Col xs={6} >
                        <Moment format="dddd [as] H:mm">
                            {item?.createdAt}
                        </Moment>
                        <div className="fw-bold">

                            <Moment format="DD [de] MMMM  [de] YYYY">
                                {item?.createdAt}
                            </Moment>

                        </div>
                    </Col>
                    <Col>
                    
                    User Name
                    </Col>
                </Row>
                <Row style={{ width: "100%" }}>
                    <Collapse in={open} >
                        <div id="example-collapse-text" style={{ width: "100%", border: 'solid 1px #eee' }}>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Campo</th>
                                        <th>Antes</th>
                                        <th>depois</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(item?.before ?? {}).map((key: string) =>
                                        <tr>
                                            <td>{i++}</td>
                                            <td>{key}</td>
                                            <td>{typeof item?.before[key] === 'boolean' ? JSON.stringify(item?.before[key]) : item?.before[key]}</td>
                                            <td>{typeof item?.after[key] === 'boolean' ? JSON.stringify(item?.after[key]) : item?.after[key]}</td>
                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        </div>
                    </Collapse>
                </Row>
            </ListGroup.Item>
        </>
    )
}