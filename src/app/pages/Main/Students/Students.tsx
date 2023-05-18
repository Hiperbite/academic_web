
import {  Card, Col, Row } from "react-bootstrap"
import { StudentCount } from "../Dashboard/gadgets/StudentCount"
import { StudentsHonorRoll } from "../Dashboard/gadgets/StudentsHonorRoll"
import { StudentsInscriptionsGadgets } from "../Dashboard/gadgets/StudentsInscriptionsGadgets"

export const Students = () => {

    return (<div className="az-content az-content-dashboard">

        <div className="container">

            <div className="az-content-body">
                <Row>
                    <Col md={6}>
                        <StudentCount />
                    </Col>
                    <Col md={6}>
                        <h3><i className="fa fa-favorite"></i>Quadro de honra</h3>
                        <StudentsHonorRoll/>
                        
                    </Col>
                    <Col md={6}>
                        <StudentsInscriptionsGadgets />
                    </Col>
                </Row>

            </div>{/* az-content-body */}
        </div>
    </div>)
}
