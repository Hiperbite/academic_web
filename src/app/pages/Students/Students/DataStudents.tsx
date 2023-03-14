import { Col, Image, Row } from "react-bootstrap"
import Moment from "react-moment"
import { Link } from "react-router-dom"

export const DataStudents = ({ student }: any) => {
    return (<Row>
        <Col md={8} >
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <Row>
                        <Col>
                            <h6 className="card-title">Dados Pessoais do Estudante</h6>
                        </Col>
                        <Col className="text-right">
                            <Link className="nav-link" to={`/students/update/${student.id}/personal`}><i className="fa fa-edit"></i></Link>
                        </Col>
                    </Row>


                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <span>Primeiro Nome</span>
                                    <h5>{student?.person?.firstName}</h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Último Nome</span>
                                    <h5>{student?.person?.lastName}</h5>
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
                                    <Link className="nav-link" style={{ float: "right" }} to={"/students/update/" + student.id+"/address"}><i className="fa fa-edit"></i></Link>
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
                                <Link className="nav-link" style={{ float: "right" }} to={`/students/update/${student.id}/contacts`}><i className="fa fa-edit"></i></Link>
                                </Col>
                            </div>
                            <div className="row">

                                {student?.person?.contacts?.filter((contact:any)=>contact.isActive).map((contact: any) =>
                                    <div className="col-md-4">
                                        <span>{contact?.type}</span>
                                        <h6>
                                            {contact?.descriptions}
                                        </h6>
                                    </div>)}
                            </div>
                        </div>
                    </ul>
                </div>
            </div>

        </Col>
        <Col>
            <Image thumbnail src={student?.person?.user?.avatar}/>
        </Col>
        </Row>
    )
}