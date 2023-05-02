import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Api, services } from "../../../../../../app/api/Api";
import { allowed, AllowedFor } from "../../../../../app/api/auth/RequireAuth";
import { ScheduleClassRegister } from "../../components/ScheduleClassRegister";

const weekDays = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    //  'Domingo'
];
export const TabScheduleClass = ({ classe }: any) => {

    const [show, setShow] = useState(false);
    const [tab, setTab] = useState(0);
    const [timeTables, setTimeTables] = useState<any>();
    const [item, setItem] = useState<any>();
    const [loading, setLoading] = useState<any>();
    const [curricularPlans, setCurricularPlan] = useState<any>();

    const handleClose = () => setShow(false);
    const handleShow = () => allowed('CLASS', 3) ? setShow(true) : null;

    const [params, setParams] = useState({ pageSize: 100, page: 1, 'where[classeId]': classe?.id });


    useMemo(async () => {
        
        const { response: { data: response } } = await Api.get({ service: services.academic.curricularPlan, id: classe?.course?.id, params: {} })
        setCurricularPlan(response)
    }, [params])

    useMemo(async () => {

        setLoading(true)

        const { response: { data: response, status } } = await Api.get({ service: services.academic.timeTables, params })

        if (status === 200) {
            setTimeTables(response?.data)
        } else {
            toast.error("Erro ao carregar horarios, por favor tente mais tarde")
        }

        setLoading(false)

    }, [params])

    const getProfessor = (disciplineId: string) =>
        curricularPlans?.items?.filter((plan: any) =>
            plan.semester === classe.semester &&
            plan?.disciplineId === disciplineId
        )[0]?.professor


    const Tabs = [ListTab, TableTab][tab]
    const updateParams = useCallback((opts: any) => {
        setParams({ ...params, ...opts });
    }, [])
    const groups = timeTables?.reduce(function (groups: any, item: any) {
        const val = item.weekDay
        groups[val] = groups[val] || []
        groups[val].push(item)
        groups[val].sort((x: any, y: any) => x.startTime > y.startTime ? 1 : -1)
        return groups
    }, {})

    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            {classe?.course?.curricularPlanId}
            <div className='row'>
                <div className='col-md-6'>
                    <h2 className="az-content-title">Horario</h2>
                </div>
                <div className='col-md-6 text-right'>
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Button variant="secondary" active={tab === 0} onClick={() => setTab(0)}>
                            <i className="fa fa-bars"></i>
                        </Button>{' '}
                        <Button variant="secondary" active={tab === 1} onClick={() => setTab(1)}>
                            <i className="fa fa-table"></i>
                        </Button>{' '}
                    </ButtonGroup>

                    <AllowedFor role={'CLASS'} level={3}>
                        <Button
                            variant="primary"
                            disabled={loading}
                            onClick={() => { setItem({}); handleShow() }}
                        >
                            {loading ? 'Loading…' : 'Registar'}
                        </Button>
                    </AllowedFor>
                </div>
            </div>

            <hr className="mg-y-30" />
            <Tabs groups={groups} getProfessor={getProfessor} setItem={setItem} handleShow={handleShow} />
            <ScheduleClassRegister show={show} handleClose={handleClose} classe={classe} item={item} updateParams={updateParams} />
        </div>
    </>)
}


const ListTab = ({ groups, setItem, getProfessor, handleShow }: any) =>
    <div className="table-responsive">
        <table className="table table-hover mg-b-0">
            <thead>
                <tr>
                    <th>Dia</th>
                    <th>Duracao</th>
                    <th>Disciplina</th>
                    <th className="text-right" colSpan={2}>Docente</th>
                </tr>
            </thead>
            {Object.keys(groups ?? {})?.map((key: any) =>
                <tbody>
                    <tr><td colSpan={4}><h5>{weekDays[Number(key)]}</h5></td></tr>
                    {groups[key].map((timeTable: any) =>
                        <tr onClick={() => { setItem(timeTable); handleShow() }}>
                            <th scope="row">

                                <Moment format="hh:mm">
                                    {`2000-01-01T${timeTable?.startTime ?? '07:00:00'}`}
                                </Moment>-
                                <Moment format="hh:mm">
                                    {moment(`2000-01-01T${timeTable?.startTime ?? '07:00:00'}`).add(timeTable?.duration, 'minutes')}
                                </Moment></th>

                            <td>{timeTable?.duration} minutos</td>
                            <td>
                                {timeTable?.discipline?.name}
                            </td>
                            <td>
                                {getProfessor(timeTable?.disciplineId)?.person?.fullName}
                            </td>
                            <td className="text-right" style={{ color: "#aaa" }}>
                                <i className="fa fa-chevron-right"></i>
                            </td>
                        </tr>)}
                </tbody>
            )}
        </table>
    </div>
export const TodayScheduleClass = ({ groups, setItem, getProfessor, handleShow }: any) =>
    <div className="table-responsive">
        <table className="table table-hover mg-b-0">
            <thead>
                <tr>
                    <th>Dia</th>
                    <th>Duracao</th>
                    <th>Disciplina</th>
                    <th className="text-right" colSpan={2}>Docente</th>
                </tr>
            </thead>
            {Object.keys(groups ?? {})?.map((key: any) =>
                <tbody>
                    <tr><td colSpan={4}><h5>{weekDays[Number(key)]}</h5></td></tr>
                    {groups[key].map((timeTable: any) =>
                        <tr onClick={() => { setItem(timeTable); handleShow() }}>
                            <th scope="row">

                                <Moment format="hh:mm">
                                    {`2000-01-01T${timeTable?.startTime ?? '07:00:00'}`}
                                </Moment>-
                                <Moment format="hh:mm">
                                    {moment(`2000-01-01T${timeTable?.startTime ?? '07:00:00'}`).add(timeTable?.duration, 'minutes')}
                                </Moment></th>

                            <td>{timeTable?.duration} minutos</td>
                            <td>
                                {timeTable?.discipline?.name}
                            </td>
                            <td>
                                {getProfessor(timeTable?.disciplineId)?.person?.fullName}
                            </td>
                            <td className="text-right" style={{ color: "#aaa" }}>
                                <i className="fa fa-chevron-right"></i>
                            </td>
                        </tr>)}
                </tbody>
            )}
        </table>
    </div>


const TableTab = ({ groups, setItem, getProfessor, handleShow }: any) =>
    <Row>
        {Object.keys(groups ?? {})?.map((key: any) => <>{groups ?
            <Col>
                <b>{weekDays[Number(key)]}</b>
                {groups[key]?.map((timeTable: any) =>
                    <Row style={{ border: "solid 1px #ddd" }}>
                        <Col onClick={() => { setItem(timeTable); handleShow() }}>

                            <br />
                            <h5>{timeTable?.discipline?.name}</h5>

                            <Moment format="hh:mm">
                                {`2000-01-01T${timeTable?.startTime ?? '07:00:00'}`}
                            </Moment>-                                    <Moment format="hh:mm">
                                {moment(`2000-01-01T${timeTable?.startTime ?? '07:00:00'}`).add(timeTable?.duration, 'minutes')}
                            </Moment><br />
                            <small><i>{timeTable?.duration} minutos</i></small><br />
                            <small>Doc: <b>{getProfessor(timeTable?.disciplineId)?.person?.fullName ?? '-'}</b></small>

                            <br />
                            <br />

                        </Col>
                    </Row>
                )}
            </Col> : null} </>
        )}
    </Row>

/*




*/