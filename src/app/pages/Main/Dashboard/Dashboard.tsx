
import React, { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import { AuthContext } from "../../../../App";

import { useApi } from "../../../app/api/apiSlice";
import { services } from "../../../app/api/services";
import { Greatings } from "./components/Greatings";
import { useDate } from "./components/useDate";
import { Calendar } from "./gadgets/Calendar";
import { ClassCountGadgets } from "./gadgets/ClassCountGadgets";
import { ClassStaffGadgets } from "./gadgets/ClassStaffGadgets";
import { StudentCountAgeGadgets } from "./gadgets/StudentCountAgeGadgets";
import { StudentCountMaritalStatusGadgets } from "./gadgets/StudentCountMaritalStatusGadgets";
import { StudentCountNationalityGadgets } from "./gadgets/StudentCountNationalityGadgets";
import { StudentCountGenderGadgets } from "./gadgets/StudentGenderCountGadgets";
import { StudentRegisteredGadgets } from "./gadgets/StudentRegisteredGadgets";
import { StudentsHonorRoll } from "./gadgets/StudentsHonorRoll";
import { StudentsInscriptionsGadgets } from "./gadgets/StudentsInscriptionsGadgets";
export const Dashboard = () => {

    const { user }: any = useContext(AuthContext);

    const { data: { data: staff } = {} } = useApi({ service: services.staff.staff.get, params: { 'where[personId]': user?.personId, pageSize: 1 } })

    const { data: { studentsCount } = {} } = useApi({ service: services.common.dashboards.common, params: {} })
    const { data: { registered } = {} } = useApi({ service: services.common.dashboards.registered, params: {} })
    const { time } = useDate()
    return (<div className="az-content az-content-dashboard">
        <div className="container">
            <div className="az-content-body">
                <div className="az-dashboard-one-title">
                    <Greatings user={user} />
                    <div className="az-content-header-right">
                        <div className="media">
                            <div className="media-body text-right">
                                <h6><Moment format="DD/MM/YYYY">
                                    {new Date()}
                                </Moment>
                                </h6>
                                <h1>{time}</h1>
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
                {staff ? <ClassStaffGadgets staff={staff[0]} /> : null}

                <Row className="mg-b-20">
                    <Col md={7} className="ht-lg-100p">
                        <StudentRegisteredGadgets data={registered?.students} />
                        <Row>
                            <Col>
                                <ClassCountGadgets />
                            </Col>
                            <Col>
                                <StudentsInscriptionsGadgets />
                            </Col>
                        </Row>
                    </Col>{/* col */}
                    <Col className="mg-t-20 mg-lg-t-0">
                        <Row>
                            <Col className="mg-t-20" md={12}>
                                <h6>Estudante de honra</h6>
                                <StudentsHonorRoll />
                            </Col>
                            <StudentCountAgeGadgets data={studentsCount?.age} />
                            <StudentCountGenderGadgets data={studentsCount?.gender} />
                            <StudentCountMaritalStatusGadgets data={studentsCount?.maritalStatus} />
                            <StudentCountNationalityGadgets data={studentsCount?.nationality} />

                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Calendar />
                    </Col>
                </Row>


            </div>
        </div>
    </div>)
}