import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Api, services } from "../../../../../app/api/Api";
import { ScheduleClassRegister } from "../../components/ScheduleClassRegister";

const weekDays = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo'
];
export const TabScheduleClass = ({ classy }: any) => {

    const [show, setShow] = useState(false);
    const [timeTables, setTimeTables] = useState<any>();
    const [item, setItem] = useState<any>();
    const [loading, setLoading] = useState<any>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 100, page: 1, 'where[classyId]': classy?.id});
    
    
    useMemo( async () => {

        setLoading(true)
        
        const { response: { data: response, status } } = await Api.get({ service: services.academic.timeTables, params })

        if (status === 200) {
            setTimeTables(response?.data)
        } else {
            toast.error("Erro ao carregar horarios, por favor tente mais tarde")
        }

        setLoading(false)
        
    }, [params])

    const updateParams = useCallback((opts: any) => {
        setParams({ ...params, ...opts });
    },[])
    const groups = timeTables?.reduce(function (groups: any, item: any) {
        const val = item.weekDay
        groups[val] = groups[val] || []
        groups[val].push(item)
        groups[val].sort((x:any, y:any)=>x.startTime>y.startTime ? 1: -1)
        return groups
    }, {})

    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <h2 className="az-content-title">Horario</h2>
            <div className='row'>
                <div className='col-md-6'>


                </div>
                <div className='col-md-6 text-right'>

                    <Button
                        variant="primary"
                        disabled={loading}
                        onClick={handleShow}
                    >
                        {loading ? 'Loading…' : 'Registar'}
                    </Button>
                </div>
            </div>

            <hr className="mg-y-30" />
            <div className="table-responsive">
                <table className="table table-hover mg-b-0">
                    <thead>
                        <tr>
                            <th>Dia</th>
                            <th>Duracao</th>
                            <th>Disciplina</th>
                            <th className="text-right"></th>
                        </tr>
                    </thead>
                    {Object.keys(groups??{})?.map((key: any) =>

                        <tbody>
                            <tr><td colSpan={4}>{weekDays[Number(key)]}</td></tr>
                            {groups[key].map((timeTable: any) =>
                            <tr onClick={() =>{setItem(timeTable) ;handleShow()}}>
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
                                <td className="text-right" style={{ color: "#aaa" }}>
                                    <i className="fas fa-chevron-right"></i>
                                </td>
                            </tr>)}
                        </tbody>
                    )}
                </table>
            </div>
            <ScheduleClassRegister show={show} handleClose={handleClose} classy={classy} item={item} updateParams={updateParams} />
        </div>
    </>)
}
