/* eslint-disable jsx-a11y/scope */
import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import { Api, services } from "../../../../../app/api/Api";
import { RegisterCurricularItem } from "../components/RegisterCurricularItem";

const plans = {
    years:
        [

        ]
}
export const TabCurricularPlan = ({ course }: any) => {

    const [registerCurricularItem, showRegisterCurricularItem] = useState(false)
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[courseId]': course?.id });
    const [data, setData] = useState<any>()
    const [item, setItem] = useState<any>()
    useMemo(async () => {
        const { response: { data: response } } = await Api.get({ service: services.academic.curricularPlan, id: course?.curricularPlanId, params })
        setData(response)
    }, [course?.curricularPlanId, params])
    useMemo(async () => {

        setItem(item)
        if (item?.id) {
            showRegisterCurricularItem(true)
        }
    }, [item])

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }

    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <div className='row'>
                <div className='col-md-6'>
            <h2 className="az-content-title">Plano Curricular do curso</h2>
                </div>
                <div className='col-md-6 text-right'>
                    <Button variant="primary" size="sm" onClick={() => {setItem(null);showRegisterCurricularItem(true)}}>
                        <i className="fa fa-plus"></i>{" "}
                        Adicionar</Button>
                    <RegisterCurricularItem updateParams={updateParams} show={registerCurricularItem} handleClose={showRegisterCurricularItem} item={item} curricularPlan={data} />
                </div>
            </div>
            <hr className="mg-y-30" />
            <div className="table-responsive">
                <table className="table table-hover  mg-b-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Disciplina</th>
                            <th>Docente</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    {[1, 2, 3, 4, 5].map((year: number) => <Year setItem={setItem} items={data?.items} year={year} />)}
                </table>
            </div>
        </div>
    </>)
}

const Year = ({ year, items, setItem }: any) => {

    return <><tbody><tr>
        <th scope="row" colSpan={5} style={{ textAlign: "center" }}><h5>{year}º Ano</h5></th>
    </tr>{[0, 1].map((i: number) =>
        <Semester items={items} setItem={setItem} semester={i + (year * 2 - 1)} />
    )}</tbody></>
}
const Semester = ({ semester, items, setItem }: any) => {
    const myItems = items?.filter((item: any, i: number) => item?.semester === semester)
    return <>
        <tr>
            <td scope="row" colSpan={2}>{semester}º  Semestre</td>

            <th scope="row">-</th>
            <th scope="row">-</th>
        </tr>
        {myItems?.map((item: any, i: number) =>
            <tr onClick={() => setItem(item)}>
                <td scope="row"></td>

                <td scope="row">{item?.discipline?.code} - {item?.discipline?.name}</td>
                <td scope="row">{item?.professor?.person?.firstName} {item?.professor?.person?.lastName}</td>
                <td scope="row">
                    <Moment format="DD/MM/YYYY">
                        {item.updatedAt}
                    </Moment>
                </td>
            </tr>)}
    </>
}