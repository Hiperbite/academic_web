import { Card, Col, Row } from "react-bootstrap"
import Moment from "react-moment"
import { Link } from "react-router-dom"

export const HistoryStudents = ({ student }: any) => {
    return (
        <div className="col-lg-8">
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <Row>
                        <Col>
                            <h6 className="card-title">Historico de suporte</h6>
                            <p className="card-text">...</p>
                        </Col>
                        <Col><Link className="nav-link" style={{ float: "right" }} to={`/students/update/${student.id}/documents`}><i className="far fa-edit"></i></Link></Col>
                    </Row>
                </div>
                <div className="card-body">
                    {student?.enrollment?.enrollmentConfirmations?.map((enroll: any) =>
                        <div className="az-list-item">  
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col></Col>
                                </Row>
                                </Card.Header>
                        </Card>
                            <div>
                                <span>{enroll?.classy?.code}</span>
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
                        </div>)}

                </div>
            </div>

        </div>
    )
}