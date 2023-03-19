import { useCallback, useMemo, useState } from "react";
import { Badge, Col, Nav, Row, Tab } from "react-bootstrap"
import { toast } from "react-toastify";
import useAxiosFetch, { Api, services } from "../../../../../app/api/Api";
import uniqBy from 'lodash/uniqBy'
import { useNavigate } from "react-router-dom";
import { RegisterAssessment } from "../../../../Students/Students/components/RegisterAssessment";
export const TabAssessmentClasse = ({ classe }: any) => {
    const navigate = useNavigate()
    const [disciplines, setDisciplines] = useState<any[]>();
    const [timeTables, setTimeTables] = useState<any>();
    const [assessmentTypes, setAssessmentTypes] = useState<any>();
    const [enrollments, setenrollments] = useState<any>();
    const [curricularPlans, setCurricularPlan] = useState<any>();
    const [initialAssessment, setInitialAssessment] = useState<any>()
    const [showAssessmentForm, setAssessmentForm] = useState<boolean>()

    const [params, setParams] = useState({ pageSize: 100, page: 1, 'where[classeId]': classe?.id });


    useMemo(async () => {

        const { response: { data: enrollments } } = await Api.get({ service: services.student.enrollment, params: { pageSize: 100, page: 1, 'where[classeId]': classe?.id, 'where[current]': 1 } })
        setenrollments(enrollments?.data)

        const { response: { data: response } } = await Api.get({ service: services.academic.curricularPlan, id: classe?.course?.id, params: {} })
        setCurricularPlan(response?.items)

        const { response: { data: dataAssessmentType } } = await Api.get({ service: services.common.assessmentTypes, params: { pageSize: 100, page: 1, 'where[isActive]': true } })
        setAssessmentTypes(dataAssessmentType?.data)

        const arr = classe?.timeTables.map((x: any) => x.discipline);
        setDisciplines(uniqBy(arr, 'id'));
    }, [params])

    useMemo(async () => {


        const { response: { data: response, status } } = await Api.get({ service: services.academic.timeTables, params })

        if (status === 200) {
            setTimeTables(response?.data)
        } else {
            toast.error("Erro ao carregar horarios, por favor tente mais tarde")
        }

    }, [params])


    const handlerShowAssessmentForm = ({
        id,
        value,
        semester,
        classeId,
        typeId,
        enrollmentId,
        disciplineId,

    }: any) => {
        setInitialAssessment({
            id,
            value,
            semester,
            enrollmentId,
            classeId:classe?.id,//: classeId ?? student?.enrollment?.classe?.id,
            disciplineId,//: item?.disciplineId,
            typeId
        })
        setAssessmentForm(!showAssessmentForm);
    }
    const getProfessor = (disciplineId: string) =>
        curricularPlans?.items?.filter((plan: any) =>
            plan.semester === classe.semester &&
            plan?.disciplineId === disciplineId
        )[0]?.professor


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
        <Row>
            <Col md={4}>   <Row>
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
                        <tr>classeId
                            <th>No</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments?.map((enrollment: any) => <tr onClick={() => navigate("/students/show/" + enrollment?.student?.id)}>
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
        </Row>
        <RegisterAssessment show={showAssessmentForm} refresh={updateParams} assessmentTypes={assessmentTypes} disciplines={disciplines} handleClose={() => setAssessmentForm(false)} assessment={initialAssessment} />
    </>
    )
}

const AssessmentDiscipline = ({ classe, discipline,params, enrollments, assessmentTypes, handlerShowAssessmentForm }: any) => {


    const [assessments, setAssessments] = useState<any[]>();
    const [item, setItem] = useState<any>({...discipline});


    useMemo(async () => {
        const { response: { data: enrollments } } = await Api.get({ service: services.common.assessments, params: { pageSize: 100, page: 1, 'where[classeId]': classe?.id, 'where[disciplineId]': discipline?.id } })
        setAssessments(enrollments?.data)
    }, [params])

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
                {enrollments?.map((enrollment: any) =><>
                    <AssessmentLine semester={classe?.semester} assessments={assessments?.filter((a: any) => a?.enrollmentId === enrollment?.id)} enrollment={enrollment} assessmentTypes={assessmentTypes} handlerShowAssessmentForm={(e:any)=>handlerShowAssessmentForm({...e, disciplineId:discipline?.id})} item={item} setItem={setItem} />
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
            onClick={() => handlerShowAssessmentForm({ typeId: type?.id, semester, item, ...assessment, enrollmentId:enrollment?.id })}
            title={type?.name + ' - ' + type?.value}
        >{assessment?.value ?? '-'}</td>
    )
}