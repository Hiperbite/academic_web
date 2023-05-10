
import {  Card, Col, Row } from "react-bootstrap"
import { StudentCount } from "../Dashboard/gadgets/StudentCount"
import { StudentsInscriptionsGadgets } from "../Dashboard/gadgets/StudentsInscriptionsGadgets"

export const Students = () => {

    return (<div className="az-content az-content-dashboard">

        <div className="container">

            <div className="az-content-body">
                <Row>
                    <Col md={6}>
                        <StudentCount /><Card><Card.Body>....</Card.Body></Card>
                    </Col>
                    <Col md={6}>
                        <StudentsInscriptionsGadgets />
                    </Col>
                </Row>

            </div>{/* az-content-body */}
        </div>
    </div>)
}
