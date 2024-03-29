

import React from "react";


import { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import moment from "moment";

import { useApi } from "../../../../../../app/api/apiSlice";
import { services } from "../../../../../../app/api/services";
import { Loading } from "../../../../Components/Snipper/Spinner";


export const weekDays = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    //'Domingo'
];
export type ScheduleType =
    "COMPACT" |
    "LIST" |
    "TODAY" |
    "BOXED" |
    "TABLE"
export const ScheduleClass = ({ classe, type }: { classe: any, type: ScheduleType }) => {

    const [show, setShow] = useState(false);

    const [item, setItem] = useState<any>();

    const [loading, setLoading] = useState(false)

    const handleShow = () => setShow(true);

    const [params, setParams] = useState({ pageSize: 100, page: 1, 'where[classeId]': classe?.id });

    const { data: { data: timeTables } = {}, loading: loadingTimeTables } = useApi({ service: services.academic.timeTables.getAll, params })

    const { data: { data: curricularPlans } = {}, loading: loadingCurricularPlans } = useApi({ service: services.academic.curricularPlan.getOne, id: classe?.course?.id, params: {} })

    useMemo(async () => {
        setParams({ pageSize: 100, page: 1, 'where[classeId]': classe?.id })
    }, [classe])
    useMemo(async () => {
        setLoading(loadingTimeTables || loadingCurricularPlans)
    }, [loadingTimeTables, loadingCurricularPlans])




    const getProfessor = (disciplineId: string) =>
        curricularPlans?.items?.filter((plan: any) =>
            plan.semester === classe.semester &&
            plan?.disciplineId === disciplineId
        )[0]?.professor

    const groups = timeTables?.reduce(function (groups: any, item: any) {
        const val = item.weekDay
        groups[val] = groups[val] || []
        groups[val].push(item)
        groups[val].sort((x: any, y: any) => x.startTime > y.startTime ? 1 : -1)
        return groups
    }, {})

    const Comp = {
        "COMPACT": ListSchedule,
        "LIST": ListSchedule,
        "TODAY": TodaySchedule,
        "BOXED": TableSchedule,
        "TABLE": TableSchedule
    }[type]
    return <>
        {loading ? <Loading loading={true} /> :
            <Comp groups={groups} getProfessor={getProfessor} setItem={setItem} handleShow={handleShow} />}</>

}


const TodaySchedule = ({ groups = [], getProfessor }: any) => {
    const weekDay = new Date().getDay() - 1;
    const timeTables = groups[weekDay];
    return <>
        {timeTables?.map((timeTable: any) =>

            <div className="az-list-item">
                <div>
                    <h6>
                        {timeTable?.discipline?.name}
                    </h6>
                    <span>{getProfessor(timeTable?.disciplineId)?.person?.fullName}</span>
                    <span>{timeTable?.duration} minutos</span>
                </div>
                <div>
                    <h6 className="tx-primary">
                        <Moment format="hh:mm">
                            {`2000-01-01T${timeTable?.startTime ?? '07:00:00'}`}
                        </Moment>
                    </h6>
                    <h6 className="tx-primary">
                        <Moment format="hh:mm">
                            {moment(`2000-01-01T${timeTable?.startTime ?? '07:00:00'}`).add(timeTable?.duration, 'minutes')}
                        </Moment>
                    </h6>

                </div>
            </div>
        )}
    </>

}
const ListSchedule = ({ groups, setItem, getProfessor, handleShow }: any) =>
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


const TableSchedule = ({ groups, setItem, getProfessor, handleShow }: any) =>
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
