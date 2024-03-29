import './TabAssessmentClasse.scss';
import { useCallback, useMemo, useState } from "react";
import { Badge, Button, Col, Nav, Row, Tab } from "react-bootstrap"

import uniqBy from 'lodash/uniqBy'
import { useNavigate } from "react-router-dom";
import { RegisterAssessment } from "../../../../../Main/Students/Students/components/RegisterAssessment";
import { useApi } from "../../../../../../app/api/apiSlice";
import { services } from "../../../../../../app/api/services";
import { allowed, AllowedFor, LockedComponent } from "../../../../../app/api/auth/RequireAuth";

const captions = ['danger', 'success', 'warning', 'warning', 'success', '']

export const TabAssessmentClasse = ({ classe, staff }: any) => {
    const navigate = useNavigate()
    const [disciplines, setDisciplines] = useState<any[]>([]);

    const [initialAssessment, setInitialAssessment] = useState<any>()
    const [showAssessmentForm, setAssessmentForm] = useState<boolean>()

    const [params, setParams] = useState({ _token: Math.random() });

    const { data: { data: enrollments } = {} } = useApi({ service: services.student.enrollment.getAll, params: { pageSize: 100, page: 1, scope: 'students', 'where[classeId]': classe?.id, 'where[current]': 1 } })

    const { data: { data: assessmentTypes } = {} } = useApi({ service: services.common.assessmentTypes.getAll, params: { pageSize: 100, page: 1, 'where[isActive]': true } })

    useMemo(async () => {
        const arr = classe?.timeTables?.map((x: any) => x.discipline);
        setDisciplines(uniqBy(arr, 'id') ?? [])
    }, [classe])

    const handlerShowAssessmentForm = ({
        id,
        value,
        semester,
        classeId,
        typeId,
        enrollmentId,
        disciplineId,

    }: any) => {
        if (allowed('CLASSIFICATION', 4)) {
            setInitialAssessment({
                id,
                value,
                semester,
                enrollmentId,
                classeId: classe?.id,
                disciplineId,
                typeId
            })
            setAssessmentForm(!showAssessmentForm);
        }
    }

    const updateParams = useCallback((opts: any) => {
        setParams({ ...params, ...opts });
    }, [])
    const authorized = (id: string) => classe?.authorizations?.filter(({ discipline, professor }: any) => professor?.id === staff?.id && discipline?.id === id).length > 0
    return (<>
        <Row id="TabAssessmentClasse">
            <h3>Pautas</h3>
            <hr />
            <AllowedFor role={'CLASSIFICATION'} level={4} showLocked={true}>
                <Col md={4} style={{ padding: 0 }}>
                    <Row>
                        <Col>
                            <Nav variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey={`index-${100}`}>.</Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Col>
                    </Row>
                    <table className="table mg-b-0">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments?.map((enrollment: any) => <tr onClick={() => allowed('STUDENTS', 4) ? navigate("/students/show/" + enrollment?.student?.id) : null}>
                                <th scope="row">{enrollment?.student?.code}</th>
                                <td>
                                    {enrollment?.student?.person?.fullName}
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </Col>
                <Col style={{ padding: 0 }}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="index-0">
                        <Row>
                            <Col>
                                <Nav variant="pills">
                                    {disciplines?.sort(({id})=>authorized(id)?-1:1).map(({ name, id }: any, i: number) =>
                                        <Nav.Item>
                                            <Nav.Link key={`key-${i}`} eventKey={`index-${i}`} disabled={!authorized(id)}>
                                            {!authorized(id) ? <i className='fa fa-lock'></i> : null} {name}
                                             </Nav.Link>
                                        </Nav.Item>
                                    )}
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Tab.Content>
                                    {disciplines?.sort(({id})=>authorized(id)?-1:1)?.map((discipline: any, i: number) =>
                                        <Tab.Pane eventKey={`index-${i}`}>
                                            {authorized(discipline?.id) ?
                                                <AssessmentDiscipline classe={classe} params={params} assessmentTypes={assessmentTypes ?? []} discipline={discipline} enrollments={enrollments} handlerShowAssessmentForm={handlerShowAssessmentForm} />
                                                : <LockedComponent showLocked={true} />}
                                        </Tab.Pane>
                                    )}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Col>
            </AllowedFor>
        </Row>
        <RegisterAssessment show={showAssessmentForm} refresh={updateParams} assessmentTypes={assessmentTypes} disciplines={disciplines} handleClose={() => setAssessmentForm(false)} assessment={initialAssessment} />
    </>
    )
}

const AssessmentDiscipline = ({ classe, discipline, params, enrollments, assessmentTypes, handlerShowAssessmentForm }: any) => {

    const { data: { data: assessments, ass: assessmentResults } = {} } = useApi({
        service: services.common.assessments.getAll,
        params: {
            pageSize: 100,
            'where[disciplineId]': discipline?.id,
            ...params
        }
    });


    const [item, setItem] = useState<any>({ ...discipline });

    return (
        <>
            <table className="table  mg-b-0">
                <thead>
                    <tr>
                        <th>PR1</th>
                        <th>PR2</th>
                        <th>Media</th>
                        <th>EX</th>
                        <th>Media</th>
                        <th>RC</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments?.map((enrollment: any) => <>
                        <AssessmentLine results={assessmentResults} semester={classe?.semester} assessments={assessments?.filter((a: any) => a?.enrollmentId === enrollment?.id)} enrollment={enrollment} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={(e: any) => handlerShowAssessmentForm({ ...e, disciplineId: discipline?.id, enrollmentId: enrollment?.id })} item={item} setItem={setItem} />
                    </>
                    )}
                </tbody>
            </table>
        </>
    )
}

const AssessmentLine = ({ results, item, setItem, assessmentTypes, enrollment, assessments, semester, handlerShowAssessmentForm }: any) => {

    const [average, setAverage] = useState<any>()
    const [hasRecourse, setRecourse] = useState<any>()

    const [result, setResult] = useState<any>({})
    useMemo(() => {
        setResult(results?.filter((r: any) => r?.key?.id === enrollment?.id)[0] ?? {})
    }, [results])

    useMemo(() => {
        let ass = assessments

        setRecourse(ass?.filter((a: any) => a.type?.code === 'RC').length > 0)
        if (hasRecourse)
            ass = ass?.filter((a: any) => a.type?.code !== 'EX')

        ass = ass?.map((a: any) => a?.value * (Number(a?.type?.value.split('%')[0]) / 100))
        const av = ass?.reduce((a: number, b: number) => a + b, 0)
        setAverage(av)

    }, [assessments])

    return (
        <tr className='line-value-container' onClick={() => setItem(item)}>

            {assessmentTypes?.filter((x: any) => ['PR1', 'PR2'].includes(x.code)).map((type: any) =>
                <Box hasRecourse={hasRecourse} value={result[type.code]} type={type} assessments={assessments} semester={semester} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={handlerShowAssessmentForm} item={item} setItem={setItem} />)}
            <th>{result['PRM']?.toFixed(2)}</th>
            {assessmentTypes?.filter((x: any) => ['EX'].includes(x.code)).map((type: any) =>
                <Box result={result} disabled={result['PRM'] < 7} value={result[type.code]} hasRecourse={hasRecourse} type={type} assessments={assessments} semester={semester} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={handlerShowAssessmentForm} item={item} setItem={setItem} />)}
            <td className={result['EXM'] >= 10 ? "text-success" : "text-danger"}><b>{result['EXM']?.toFixed(2) ?? '-'}</b></td>
            {assessmentTypes?.filter((x: any) => ['RC'].includes(x.code)).map((type: any) =>
                <Box result={result} value={result[type.code]} hasRecourse={hasRecourse} type={type} assessments={assessments} semester={semester} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={handlerShowAssessmentForm} item={item} setItem={setItem} />)}
            <td><Badge bg={captions[result['FINAL']]} className="text-white">{result['RESULT']}</Badge></td>
        </tr>
    )
}


export const Box = ({ disabled, item, hasRecourse, type, assessments, semester, enrollment, handlerShowAssessmentForm }: any) => {
    const [assessment, setAssessment] = useState<any>()


    useMemo(() => {
        setAssessment(assessments?.filter((ass: any) => ass?.typeId === type?.id)[0])
    }, [assessments, type])
    return (
        <td
            className={"box-value-container  " + (disabled ? 'negative' : '')}
            title={type?.name + ' - ' + type?.value}
        >{assessment?.value ?? '-'}
            <i
                className="fa fa-edit"
                onClick={() => allowed('CLASSIFICATION', 3) ? handlerShowAssessmentForm({ typeId: type?.id, semester, item, ...assessment, enrollmentId: enrollment?.id }) : null}
            ></i>
        </td>
    )
}