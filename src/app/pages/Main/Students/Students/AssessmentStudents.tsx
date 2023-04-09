import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import Moment from "react-moment";
import { Api, services } from "../../../../app/api/Api";
import { allowed } from "../../../app/api/auth/RequireAuth";
import { Loading } from "../../../Components/Snipper/Spinner";
import { RegisterAssessment } from "./components/RegisterAssessment";


const captions = ['Reprovado', 'Despensado', 'Exame', 'Recurso', 'Aprovado', '']
export const AssessmentStudents = ({ student, years = [1, 2, 3, 4, 5], semesters = [0, 1] }: any) => {

    const [loading, setLoading] = useState(false)

    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[id]': student?.enrollment?.classe?.courseId });
    const [data, setData] = useState<any>()
    const [item, setItem] = useState<any>()
    useMemo(async () => {
        const { response: { data: response } } = await Api.get({ service: services.academic.curricularPlan, id: student?.enrollment?.classe?.courseId, params })
        setData(response)
    }, [student])

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }

    const [disciplines, setDisciplines] = useState()
    const [assessmentTypes, setAssessmentTypes] = useState<any[]>()
    const [assessments, setAssessments] = useState<any[]>()
    const [assessmentResults, setAssessmentResults] = useState<any[]>([])
    const [assessment, setAssessment] = useState<any[]>()
    const [initialAssessment, setInitialAssessment] = useState<any>()
    const [showAssessmentForm, setAssessmentForm] = useState<boolean>()
    useMemo(async () => {
        setLoading(true)
        const { response: { data: response, status } } = await Api.get({
            service: services.academic.curricularPlanItem,
            params: {
                pageSize: 100,
                'where[curricularPlanId]': student?.enrollment?.classe?.courseId
            }
        });
        setDisciplines(response?.data.map((d: any) => d.discipline))

        const { response: { data: r, status: s } } = await Api.get({
            service: services.common.assessmentTypes,
            params: {
                pageSize: 100,
                'where[isActive]': true,
            }
        });
        setAssessmentTypes(r?.data)
        setLoading(false)
    }, [student])


    useMemo(async () => {
        const { response: { data: res, status: sta } } = await Api.get({
            service: services.common.assessments,
            params: {
                pageSize: 100,
                'where[enrollmentId]': student?.enrollment?.id
            }
        });
        setAssessments(res?.data);
        setAssessmentResults(res?.ass);
    }, [params])
    const handlerShowAssessmentForm = ({
        id,
        value,
        item,
        semester,
        staffId,
        classeId,
        typeId,
        updatedAt,
        createdAt,
        isActive

    }: any) => {
        setInitialAssessment({
            id,
            value,
            semester,
            enrollmentId: student?.enrollment?.id,
            staffId: staffId ?? item?.staffId,
            classeId: classeId ?? student?.enrollment?.classe?.id,
            disciplineId: item?.disciplineId,
            typeId
        })
        setAssessmentForm(!showAssessmentForm);
    }

    return (
        <>
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <h6 className="card-title">Exames, Provas e avaliações</h6>
                </div>
                <Loading loading={loading} />
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mg-b-0">
                            <thead>
                                <tr>
                                    <th>Disciplina</th>
                                    <th>PR1</th>
                                    <th>PR2</th>
                                    <th>Media</th>
                                    <th>EX</th>
                                    <th>Media</th>
                                    <th>RC</th>
                                    <th>Resultado</th>
                                </tr>
                            </thead>
                            {years.map((year: number) => <Year setItem={setItem} semesters={semesters} handlerShowAssessmentForm={handlerShowAssessmentForm} assessments={assessments} results={assessmentResults} assessmentTypes={assessmentTypes} items={data?.items} year={year} />)}
                        </table>
                    </div>
                </div>
            </div>
            <RegisterAssessment show={showAssessmentForm} refresh={updateParams} assessmentTypes={assessmentTypes} disciplines={disciplines} handleClose={() => setAssessmentForm(false)} assessment={initialAssessment} />
        </>

    )
}


const Year = ({ year, semesters, items, setItem, assessmentTypes, assessments, handlerShowAssessmentForm, results }: any) => {

    return <><tbody><tr>
        <th scope="row" colSpan={5 + assessmentTypes?.length} style={{ textAlign: "center" }}><h5>{year}º Ano</h5></th>
    </tr>{semesters.map((i: number) =>
        <Semester handlerShowAssessmentForm={handlerShowAssessmentForm} items={items} setItem={setItem} results={results} assessments={assessments} assessmentTypes={assessmentTypes} semester={i + (year * 2 - 1)} />
    )}</tbody></>
}
const Semester = ({ semester, items, setItem, assessmentTypes, assessments, handlerShowAssessmentForm, results }: any) => {
    const myItems = items?.filter((item: any, i: number) => item?.semester === semester)


    return <>
        <tr>
            <td scope="row" className="text-left" colSpan={3 + assessmentTypes?.length}><b>{semester}º  Semestre</b></td>
        </tr>
        {myItems?.map((item: any, i: number) => <AssessmentLine results={results} assessments={assessments} semester={semester} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={handlerShowAssessmentForm} item={item} setItem={setItem} />)}
    </>
}

const AssessmentLine = ({ results, item, setItem, assessmentTypes, assessments, semester, handlerShowAssessmentForm }: any) => {

    const [average, setAverage] = useState<any>()
    const [hasRecourse, setRecourse] = useState<any>()
    const [result, setResult] = useState<any>({})
    useMemo(() => {
        setResult(results?.filter((r: any) => r?.key?.id === item?.disciplineId)[0] ?? {})
    }, [results])

    const captions = ['danger', 'success', 'warning', 'warning', 'success', '']
    return (
        <tr onClick={() => setItem(item)}>
            <td >{item?.discipline?.code} - {item?.discipline?.name}
            
            </td>

            {assessmentTypes?.filter((x: any) => ['PR1', 'PR2'].includes(x.code)).map((type: any) =>
                <Box hasRecourse={hasRecourse} value={result[type.code]} type={type} assessments={assessments} semester={semester} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={handlerShowAssessmentForm} item={item} setItem={setItem} />)}
            <th>{result['PRM']?.toFixed(2)}</th>
            {assessmentTypes?.filter((x: any) => ['EX'].includes(x.code)).map((type: any) =>
                <Box result={result} value={result[type.code]} hasRecourse={hasRecourse} type={type} assessments={assessments} semester={semester} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={handlerShowAssessmentForm} item={item} setItem={setItem} />)}
            <td className={result['EXM'] >= 10 ? "text-success" : "text-danger"}><b>{result['EXM']?.toFixed(2)??'-'}</b></td>
            {assessmentTypes?.filter((x: any) => ['RC'].includes(x.code)).map((type: any) =>
                <Box result={result} value={result[type.code]} hasRecourse={hasRecourse} type={type} assessments={assessments} semester={semester} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={handlerShowAssessmentForm} item={item} setItem={setItem} />)}
            <td><Badge bg={captions[result['FINAL']]} className="text-white">{result['RESULT']}</Badge></td>
        </tr>
    )
}

export const Box = ({ item, value, setItem, hasRecourse, type, assessmentTypes, assessments, semester, handlerShowAssessmentForm }: any) => {
    const [assessment, setAssessment] = useState<any>()

    const stylesIfHasResource = hasRecourse && type?.code === 'EX' ? {
        textDecoration: 'line-through',
        color: "#999"
    } : {}
    useMemo(() => {
        setAssessment(assessments.filter((a: any) => a?.typeId === type.id && a?.disciplineId === item?.disciplineId)[0])
    }, [assessments, item?.disciplineId, type.id])
    return (
        <td
            style={stylesIfHasResource}
            onClick={() => allowed('CLASSIFICATION', 3) ? handlerShowAssessmentForm({ typeId: type?.id, semester, item, ...assessment }) : null}
            title={type?.name + ' - ' + type?.value}
        >{value ?? '-'} </td>
    )
}

export default AssessmentStudents

