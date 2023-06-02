import { Col, Row } from "react-bootstrap"
import { Calendar } from "../Dashboard/gadgets/Calendar"

export const Pedagogical=()=>{
    return (<Row sty>
        <Col md={8}>
        <Calendar></Calendar>
        </Col>
        </Row>)
}