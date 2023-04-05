import { useCallback, useMemo, useState } from "react";
import { Badge, Col, Nav, Row, Tab } from "react-bootstrap"
import { toast } from "react-toastify";
//import useAxiosFetch, { Api, services } from "../../../../../../app/api/Api";
import uniqBy from 'lodash/uniqBy'
import { useNavigate } from "react-router-dom";
import { RegisterAssessment } from "../../../../../Main/Students/Students/components/RegisterAssessment";
import { useApi } from "../../../../../../app/api/apiSlice";
import { services } from "../../../../../../app/api/services";
import { allowed, AllowedFor } from "../../../../../app/api/auth/RequireAuth";

const Api: any = () => ({});
export const TabAssessmentClasse = ({ classe }: any) => {
    const navigate = useNavigate()
    const [disciplines, setDisciplines] = useState<any[]>([]);
    const [timeTables, setTimeTables] = useState<any>();
    const [initialAssessment, setInitialAssessment] = useState<any>()
    const [showAssessmentForm, setAssessmentForm] = useState<boolean>()

    const [params, setParams] = useState({ _token: Math.random() });


    const { data: { data: enrollments } } = useApi({ service: services.student.enrollment.getAll, params: { pageSize: 100, page: 1, scope: 'students', 'where[classeId]': classe?.id, 'where[current]': 1 } })

    const { data: curricularPlans } = useApi({ service: services.academic.curricularPlan.getOne, id: classe?.course?.id, params: {} })

    const { data: { data: assessmentTypes = [] } } = useApi({ service: services.common.assessmentTypes.getAll, params: { pageSize: 100, page: 1, 'where[isActive]': true } })

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
                classeId: classe?.id,//: classeId ?? student?.enrollment?.classe?.id,
                disciplineId,//: item?.disciplineId,
                typeId
            })
            setAssessmentForm(!showAssessmentForm);
        }
    }

    const updateParams = useCallback((opts: any) => {
        setParams({ ...params, ...opts });
    }, [])

    return (<>
        <Row>
            <h3>Pautas</h3>
            <hr/>
            <AllowedFor role={'CLASSIFICATION'} level={4} showLocked={true}>
                <Col md={4}>
                    <Row>
                        <Col>
                            <Nav variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey={`index-${100}`}>...</Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Col>
                    </Row>
                    <table className="table  mg-b-0">
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
                <Col>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="index-0">
                        <Row>
                            <Col>
                                <Nav variant="pills">
                                    {disciplines?.map(({ name }: any, i: number) =>
                                        <Nav.Item>
                                            <Nav.Link key={`key-${i}`} eventKey={`index-${i}`}>{name}</Nav.Link>
                                        </Nav.Item>
                                    )}
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Tab.Content>
                                    {disciplines?.map((discipline: any, i: number) =>
                                        <Tab.Pane eventKey={`index-${i}`}>
                                            <AssessmentDiscipline classe={classe} params={params} assessmentTypes={assessmentTypes} discipline={discipline} enrollments={enrollments} handlerShowAssessmentForm={handlerShowAssessmentForm} />
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

    const [item, setItem] = useState<any>({ ...discipline });

    const { data: { data: assessments = [] } } = useApi({ service: services.common.assessments.getAll, params: { ...params, pageSize: 100, page: 1, 'where[classeId]': classe?.id, 'where[disciplineId]': discipline?.id } })

    return (
        <table className="table  mg-b-0">
            <thead>
                <tr>
                    {assessmentTypes.map((assessment: any) =>
                        <th>{assessment?.code}</th>)}
                    <th>Media</th>
                    <th>Resultado</th>
                </tr>
            </thead>
            <tbody>
                {enrollments?.map((enrollment: any) => <>
                    <AssessmentLine semester={classe?.semester} assessments={assessments?.filter((a: any) => a?.enrollmentId === enrollment?.id)} enrollment={enrollment} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={(e: any) => handlerShowAssessmentForm({ ...e, disciplineId: discipline?.id })} item={item} setItem={setItem} />
                </>
                )}
            </tbody>
        </table>
    )
}

const AssessmentLine = ({ item, setItem, assessmentTypes, enrollment, assessments, semester, handlerShowAssessmentForm }: any) => {

    const [average, setAverage] = useState<any>()
    const [hasRecourse, setRecourse] = useState<any>()
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
        <tr onClick={() => setItem(item)}>

            {assessmentTypes?.map((type: any) => <Box hasRecourse={hasRecourse} enrollment={enrollment} type={type} assessments={assessments} semester={semester} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={handlerShowAssessmentForm} item={item} setItem={setItem} />)}
            <td className={average >= 10 ? "text-success" : "text-danger"}><b>{average?.toFixed(2)}</b></td>
            <td >

                {average >= 10
                    ? <Badge bg="success" className="text-white">Aprovado</Badge>
                    : <Badge bg="danger" className="text-white">Reprovado</Badge>
                }
            </td>
        </tr>
    )
}


export const Box = ({ item, hasRecourse, type, assessments, semester, enrollment, handlerShowAssessmentForm }: any) => {
    const [assessment, setAssessment] = useState<any>()


    const stylesIfHasResource = hasRecourse && type?.code === 'EX' ? {
        textDecoration: 'line-through',
        color: "#999"
    } : {}
    useMemo(() => {
        setAssessment(assessments?.filter((ass: any) => ass?.typeId === type?.id)[0])
    }, [assessments, type])
    return (
        <td
            style={stylesIfHasResource}
            onClick={() => handlerShowAssessmentForm({ typeId: type?.id, semester, item, ...assessment, enrollmentId: enrollment?.id })}
            title={type?.name + ' - ' + type?.value}
        >{assessment?.value ?? '-'}</td>
    )
}