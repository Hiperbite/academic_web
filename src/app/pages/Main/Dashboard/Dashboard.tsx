
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import { useApi } from "../../../app/api/apiSlice";
import { services } from "../../../app/api/services";
import { Greatings } from "./components/Greatings";
import { useDate } from "./components/useDate";
import { StudentCountAgeGadgets } from "./gadgets/StudentCountAgeGadgets";
import { StudentCountMaritalStatusGadgets } from "./gadgets/StudentCountMaritalStatusGadgets";
import { StudentCountNationalityGadgets } from "./gadgets/StudentCountNationalityGadgets";
import { StudentCountGenderGadgets } from "./gadgets/StudentGenderCountGadgets";
import { StudentRegisteredGadgets } from "./gadgets/StudentRegisteredGadgets";
export const Dashboard = () => {
    const { data: { studentsCount } = {} } = useApi({ service: services.common.dashboards.common, params: {} })
    const { data: { registered } = {} } = useApi({ service: services.common.dashboards.registered, params: {} })
    const { date, time, wish } = useDate()
    return (<div className="az-content az-content-dashboard">
        <div className="container">
            <div className="az-content-body">
                <div className="az-dashboard-one-title">
                    <Greatings />
                    <div className="az-content-header-right">
                        <div className="media">
                            <div className="media-body text-right">
                                <label>End Date</label>
                                <h6><Moment format="DD/MM/YYYY">
                                    {new Date()}
                                </Moment>
                                </h6>
                                <h3>{time}</h3>
                            </div>{/* media-body */}
                        </div>{/* media */}
                    </div>
                </div>{/* az-dashboard-one-title */}

                <div className="az-dashboard-nav">
                    <nav className="nav">
                        <a className="nav-link active" data-toggle="tab" href="#">Geral</a>
                        <a className="nav-link" data-toggle="tab" href="#">Professores</a>
                        <a className="nav-link" data-toggle="tab" href="#">Estudantes</a>
                        <a className="nav-link" data-toggle="tab" href="#">Inscrição</a>
                        <a className="nav-link" data-toggle="tab" href="#">Acessos</a>
                    </nav>

                    <nav className="nav">
                        <a className="nav-link" href="#"><i className="fa fa-edit"></i> </a>
                        <a className="nav-link" href="#"><i className="fa fa-file"></i> </a>
                        <a className="nav-link" href="#"><i className="fa fa-print"></i></a>
                        <a className="nav-link" href="#"><i className="fa fa-ellipsis-h"></i></a>
                    </nav>
                </div>

                <Row className="mg-b-20">
                    <Col md={7} className="ht-lg-100p">
                        <StudentRegisteredGadgets data={registered?.students} />
                        <Row>
                            <Col>
                                <Card className="card-dashboard-pageviews">
                                    <Card.Header>
                                        <h6 className="card-title">Page Views by Page Title</h6>
                                        <p className="card-text">This report is based on 100% of sessions.</p>
                                    </Card.Header>{/* card-header */}
                                    <Card.Body>
                                        <div className="az-list-item">
                                            <div>
                                                <h6>Admin Home</h6>
                                                <span>/demo/admin/index.html</span>
                                            </div>
                                            <div>
                                                <h6 className="tx-primary">7,755</h6>
                                                <span>31.74% (-100.00%)</span>
                                            </div>
                                        </div>{/* list-group-item */}
                                        <div className="az-list-item">
                                            <div>
                                                <h6>Form Elements</h6>
                                                <span>/demo/admin/forms.html</span>
                                            </div>
                                            <div>
                                                <h6 className="tx-primary">5,215</h6>
                                                <span>28.53% (-100.00%)</span>
                                            </div>
                                        </div>{/* list-group-item */}
                                        <div className="az-list-item">
                                            <div>
                                                <h6>Utilities</h6>
                                                <span>/demo/admin/util.html</span>
                                            </div>
                                            <div>
                                                <h6 className="tx-primary">4,848</h6>
                                                <span>25.35% (-100.00%)</span>
                                            </div>
                                        </div>{/* list-group-item */}
                                        <div className="az-list-item">
                                            <div>
                                                <h6>Form Validation</h6>
                                                <span>/demo/admin/validation.html</span>
                                            </div>
                                            <div>
                                                <h6 className="tx-primary">3,275</h6>
                                                <span>23.17% (-100.00%)</span>
                                            </div>
                                        </div>{/* list-group-item */}
                                        <div className="az-list-item">
                                            <div>
                                                <h6>Modals</h6>
                                                <span>/demo/admin/modals.html</span>
                                            </div>
                                            <div>
                                                <h6 className="tx-primary">3,003</h6>
                                                <span>22.21% (-100.00%)</span>
                                            </div>
                                        </div>{/* list-group-item */}

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="card-dashboard-four">
                                    <Card.Header>
                                        <h6 className="card-title">Sessions by Channel</h6>
                                    </Card.Header>{/* card-header */}
                                    <Card.Body>
                                        <div className="col-md-6 d-flex align-items-center">
                                            <div className="chart"><canvas id="chartDonut"></canvas></div>
                                        </div>{/* col */}
                                        <div className="col-md-6 col-lg-5 mg-lg-l-auto mg-t-20 mg-md-t-0">
                                            <div className="az-traffic-detail-item">
                                                <div>
                                                    <span>Organic Search</span>
                                                    <span>1,320 <span>(25%)</span></span>
                                                </div>
                                                <div className="progress">

                                                </div>{/* progress */}
                                            </div>
                                            <div className="az-traffic-detail-item">
                                                <div>
                                                    <span>Email</span>
                                                    <span>987 <span>(20%)</span></span>
                                                </div>
                                                <div className="progress">

                                                </div>{/* progress */}
                                            </div>
                                            <div className="az-traffic-detail-item">
                                                <div>
                                                    <span>Referral</span>
                                                    <span>2,010 <span>(30%)</span></span>
                                                </div>
                                                <div className="progress">

                                                </div>{/* progress */}
                                            </div>
                                            <div className="az-traffic-detail-item">
                                                <div>
                                                    <span>Social</span>
                                                    <span>654 <span>(15%)</span></span>
                                                </div>
                                                <div className="progress">

                                                </div>{/* progress */}
                                            </div>
                                            <div className="az-traffic-detail-item">
                                                <div>
                                                    <span>Other</span>
                                                    <span>400 <span>(10%)</span></span>
                                                </div>
                                                <div className="progress">

                                                </div>{/* progress */}
                                            </div>
                                        </div>{/* col */}
                                    </Card.Body>{/* card-body */}
                                </Card>{/* card-dashboard-four */}
                            </Col>
                        </Row>
                    </Col>{/* col */}
                    <Col className="mg-t-20 mg-lg-t-0">
                        <Row>
                            <Col className="mg-t-20" md={12}>
                                <Card >
                                    <Card.Header>
                                        <p>Estudante de honra</p>
                                        <h2>17,8 <small className="tx-success">
                                            <i className="fa fa-chevron-up"></i> 2.87%</small>
                                        </h2>
                                    </Card.Header>{/* card-header */}
                                    <Card.Body>
                                        <small>Os Quadros de Honra, de Mérito e de Valor instituem o reconhecimento e valorização do mérito, dedicação e esforço no trabalho escolar, bem como das ações meritórias desenvolvidas na comunidade..</small>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <StudentCountAgeGadgets data={studentsCount?.age} />
                            <StudentCountGenderGadgets data={studentsCount?.gender} />
                            <StudentCountMaritalStatusGadgets data={studentsCount?.maritalStatus} />
                            <StudentCountNationalityGadgets data={studentsCount?.nationality} />

                        </Row>
                    </Col>
                </Row>


            </div>
        </div>
    </div>)
}