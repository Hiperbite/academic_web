import { Accordion, Card, Col, Row, Badge, Table } from "react-bootstrap"
import moment from "moment"
import { Link } from "react-router-dom"
import { useApi } from "../../../../app/api/apiSlice"
import services from "../../../../app/api/services"

export const HistoryStudents = ({ student }: any) => {
    return (
        <div className="col-lg-9">
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <Row>
                        <Col>
                            <h6 className="card-title">Historico de suporte</h6>
                            <p className="card-text">...</p>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
                <div className="card-body">
                    <Accordion defaultActiveKey="0">
                        {student?.enrollments?.map((enroll: any, i: number) =>
                            <Accordion.Item eventKey={`${i}`}>
                                <Accordion.Header>
                                    {moment(enroll?.createdAt).format('YYYY')} - Turma: {enroll?.classe?.code} - Semestre: {enroll?.classe?.semester}º - Ano: {enroll?.classe?.grade}º
                                    {enroll?.current ?
                                        <Badge bg="success" className={"pull-right"}>Success</Badge> : null}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <AccordionBodyContent enroll={enroll} student={student} />
                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>
                </div>
            </div>

        </div>
    )
}

const AccordionBodyContent = ({ enroll, student }: any) => {
    const {data:enrollment}:any = useApi({service:services.student.enrollment.getAll, id:enroll?.id, params:{scope:'full'}})
    return (<>
    {enrollment?.current ?
                                        <Badge bg="success">Activo</Badge> : null}
        <h1>
            #{enrollment?.code.toUpperCase()}
        </h1>
        de <b>{moment(enrollment?.createdAt).format('DD [de] MMMM [de] YYYY')}</b><br/>
        por: <b>{enrollment?.updatedBy?.username?.split('.').join(' ').toUpperCase()}</b><br/>
        Turma: {enrollment?.classe?.code} - Semestre: {enrollment?.classe?.semester}º - Ano: {enrollment?.classe?.grade}º<br/>
        Periodo: <b>{enrollment?.classe?.period?.descriptions} </b><br/>
        Sala: <b>{enrollment?.classe?.classeRoom?.code} ({enrollment?.classe?.classeRoom?.size}) </b><br/>
        Curso: <b>{enrollment?.classe?.course?.name} </b><br/>
        
        
        <hr/>
        <Table>
            <thead>
            <tr>
                <th>Data</th>
                <th>Disciplina</th>
                <th>Tipo</th>
                <th>Valor</th>
            </tr>
            </thead>
            <tbody>
                {enrollment?.assessments?.map((ass:any)=><tr>
                    <td><small>{moment(ass?.createdAt).format('DD[/]MM[/]YYYYY')}</small>
                    <br/>{moment(ass?.createdAt).format('H:mm')}</td>
                    <td>{ass?.discipline?.name}</td>
                    <td>{ass?.type?.code} - {ass?.type?.name}</td>
                    <td className="text-right"><b>{ass?.value}</b></td>
                </tr>
                )}
            </tbody>
        </Table>
    </>)
}

/*

<div className="az-list-item">
                            <Card>
                                <Card.Header>
                                    <Row>
                                        <Col></Col>
                                    </Row>
                                </Card.Header>
                            </Card>
                            <div>
                                <span>{enroll?.classe?.code}</span>
                                <h6 className="tx-primary">{enroll?.number ?? enroll?.descriptions ?? '-'}</h6>
                            </div>
                            <div>
                                {enroll?.issueDate ?
                                    <>
                                        <span>
                                            Emitido aos:
                                            <Moment format="DD/MM/YYYY">
                                                {enroll?.issueDate}
                                            </Moment>
                                        </span></> : null}
                                <>
                                    <br />
                                    <span>
                                        Valido ate: <Moment format="DD/MM/YYYY">
                                            {enroll?.createdAt}
                                        </Moment>
                                    </span></>
                            </div>
                        </div>*/