import { Card, Col, Image, Row } from "react-bootstrap"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { Avatar } from "../../User/components/Avatar/Avatar"

export const DataStaff = ({ staff }: any) => {

    return (<Row>
        <Col md={8} >
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            <h6 className="card-title">Dados Pessoais do Estudante</h6>
                        </Col>
                        <Col className="text-right">
                            <Link className="nav-link" to={`/staffs/update/${staff.id}/step1`}><i className="fa fa-edit"></i></Link>
                        </Col>
                    </Row>


                </Card.Header>
                <Card.Body>
                    <ul className="list-group list-group-flush">
                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <span>Primeiro Nome</span>
                                    <h5>{staff?.person?.firstName}</h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Último Nome</span>
                                    <h5>{staff?.person?.lastName}</h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Outros Nomes</span>
                                    <h5>{staff?.person?.otherNames ?? '-'}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <span>Sexo</span>
                                    <h5>{staff?.person?.gender}</h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Estado civil</span>
                                    <h5>{staff?.person?.maritalStatus}</h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Data de Nascimento</span>
                                    <h5>
                                        <Moment format="DD/MM/YYYY">{staff?.person?.birthDate}
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
                                        {staff?.person?.livingAddress?.address ?? '-'}
                                        {staff?.person?.livingAddress?.city}
                                    </h6>
                                </div>
                                <div className="col-md-4">
                                    <span>Província</span>
                                    <h6>{staff?.person?.livingAddress?.province}</h6>
                                </div>
                                <div className="col-md-4">
                                    <Link className="nav-link" style={{ float: "right" }} to={"/staffs/update/" + staff.id + "/step5"}><i className="fa fa-edit"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <span>Naturaliade</span>
                                    <h6>
                                        {staff?.person?.birthPlaceAddress?.address}
                                        {staff?.person?.birthPlaceAddress?.city}
                                    </h6>
                                </div>
                                <div className="col-md-4">
                                    <span>Provincia</span>
                                    <h6>{staff?.person?.birthPlaceAddress?.province}</h6>
                                </div>
                                <div className="col-md-4">

                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                <Col>
                                    <Link className="nav-link" style={{ float: "right" }} to={`/staffs/update/${staff.id}/step2`}><i className="fa fa-edit"></i></Link>
                                </Col>
                            </div>
                            <div className="row">

                                {staff?.person?.contacts?.filter((contact: any) => contact.isActive).map((contact: any) =>
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
        </Col>
        <Col>
            {staff?.person?.user ?
                <Avatar avatar={staff?.person?.user?.avatar} user={staff?.person?.user} />
                : null}
        </Col>
    </Row>
    )
}