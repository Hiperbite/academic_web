import { Card, Col, Row, Table } from "react-bootstrap"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { Avatar } from "../../User/components/Avatar/Avatar"
import { StudentData } from "./Documents/Template/StudentData"

export const DataStudents = ({ student }: any) => {
    return (<Row>
        {/*<StudentData student={student}/>*/}
        <Col md={8} >
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            <h6 className="card-title">Dados Pessoais do Estudante</h6>
                        </Col>
                        <Col className="text-right">
                            <Link className="nav-link" to={`/students/update/${student.id}/step1`}><i className="fa fa-edit"></i></Link>
                        </Col>
                    </Row>


                </Card.Header>
                <Card.Body>
                    <ul className="list-group list-group-flush">
                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <span>Primeiro Nome</span>
                                    <h5>{student?.person?.firstName}</h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Último Nome</span>
                                    <h5>{student?.person?.lastName} {student?.person?.otherNames ?? '-'}</h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Outros Nomes</span>
                                    <h5>{student?.person?.otherNames ?? '-'}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <span>Sexo</span>
                                    <h5>{student?.person?.gender}</h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Estado civil</span>
                                    <h5>{student?.person?.maritalStatus}</h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Data de Nascimento</span>
                                    <h5>
                                        <Moment format="DD/MM/YYYY">{student?.person?.birthDate}
                                        </Moment>
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <span>Morada</span>
                                    <h6>
                                        {student?.person?.livingAddress?.address ?? '-'}
                                        {student?.person?.livingAddress?.city}
                                    </h6>
                                </div>
                                <div className="col-md-4">
                                    <span>Província</span>
                                    <h6>{student?.person?.livingAddress?.province}</h6>
                                </div>
                                <div className="col-md-4">
                                    <Link className="nav-link" style={{ float: "right" }} to={"/students/update/" + student.id + "/step5"}><i className="fa fa-edit"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <span>Naturaliade</span>
                                    <h6>
                                        {student?.person?.birthPlaceAddress?.address}
                                        {student?.person?.birthPlaceAddress?.city}
                                    </h6>
                                </div>
                                <div className="col-md-4">
                                    <span>Provincia</span>
                                    <h6>{student?.person?.birthPlaceAddress?.province}</h6>
                                </div>
                                <div className="col-md-4">

                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                <Col>
                                    <Link className="nav-link" style={{ float: "right" }} to={`/students/update/${student.id}/step2`}><i className="fa fa-edit"></i></Link>
                                </Col>
                            </div>
                            <div className="row">

                                {student?.person?.contacts?.filter((contact: any) => contact.isActive).map((contact: any) =>
                                    <div className="col-md-4">
                                        <span>{contact?.type}</span>
                                        <h6>
                                            {contact?.descriptions}
                                        </h6>
                                    </div>)}
                            </div>
                        </div>
                    </ul>
                </Card.Body>
            </Card>
            <hr />
            <Card>
                <Card.Body>
                    <ul className="list-group list-group-flush">
                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-12">
                                    <span>Curso desejado</span>
                                    <h5>{student?.desiredCourse?.code} - {student?.desiredCourse?.name}</h5>
                                </div>
                            </div>
                        </div>
                    </ul>
                </Card.Body>
            </Card>
        </Col>
        <Col>
            {student?.person?.user ?
                <Avatar avatar={student?.person?.user?.avatar} user={student?.person?.user} />
                : null}
        </Col>
    </Row>
    )
}