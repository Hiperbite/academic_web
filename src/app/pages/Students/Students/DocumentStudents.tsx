import { Col, Row } from "react-bootstrap"
import Moment from "react-moment"
import { Link } from "react-router-dom"

export const DocumentStudents = ({ student }: any) => {
    return (
        <div className="col-lg-8">
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <Row>
                        <Col>
                            <h6 className="card-title">Documentos de suporte</h6>
                            <p className="card-text">...</p>
                        </Col>
                        <Col><Link className="nav-link" style={{ float: "right" }} to={`/students/update/${student.id}/documents`}><i className="far fa-edit"></i></Link></Col>
                    </Row>

                </div>
                <div className="card-body">
                    {student?.person?.documents?.map((document: any) =>
                        <div className="az-list-item">
                            <div>
                                <span>{document?.type}</span>
                                <h6 className="tx-primary">{document?.number ?? document?.descriptions ?? '-'}</h6>
                            </div>
                            <div>
                                {document?.issueDate ?
                                <>
                                    <span>
                                        Emitido aos: 
                                        <Moment format="DD/MM/YYYY">
                                            {document?.issueDate}
                                        </Moment>
                                    </span></> : null}
                                {document?.validationDate ?
                                    <>
                                        <br />
                                        <span>
                                            Valido ate: <Moment format="DD/MM/YYYY">
                                                {document?.validationDate}
                                            </Moment>
                                        </span></> : ''}
                            </div>
                        </div>)}

                </div>
            </div>

        </div>
    )
}