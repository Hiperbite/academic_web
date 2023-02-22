import Moment from "react-moment"

export const DataStudents = ({ student }: any) => {
    return (
        <div className="col-lg-8">
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <h6 className="card-title">Dados Pessoais do Estudante</h6>
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
                                    <h5>{student?.person?.outherName ?? '-'}</h5>
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
                                    <h5>
                                        {student?.person?.livingAddres?.address}
                                        {student?.person?.livingAddres?.city}
                                    </h5>
                                </div>
                                <div className="col-md-4">
                                    <span>.</span>
                                    <h5>{student?.person?.livingAddres?.province}</h5>
                                </div>
                                <div className="col-md-4">
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <span>Naturaliade</span>
                                    <h5>
                                        {student?.person?.birthPlaceAddres?.address}
                                        {student?.person?.birthPlaceAddres?.city}
                                    </h5>
                                </div>
                                <div className="col-md-4">
                                    <span>Provincia</span>
                                    <h5>{student?.person?.birthPlaceAddres?.province}</h5>
                                </div>
                                <div className="col-md-4">
                                </div>
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                {student?.person?.contacts?.map((contact: any) =>
                                    <div className="col-md-4">
                                        <span>{contact?.type}</span>
                                        <h5>
                                            {contact?.descriptions}
                                        </h5>
                                    </div>)}
                            </div>
                        </div>
                        <div className="list-group-item">
                            <div className="row">
                                {student?.person?.documents?.map((document: any) =>
                                    <div className="col-md-4">
                                        <span>{document?.type}</span>
                                        <h5>
                                            {document?.number}
                                        </h5>
                                        {document?.validationDate ?
                                            <span>
                                                <Moment format="DD/MM/YYYY">{document?.validationDate}
                                                </Moment>

                                            </span>
                                            : ''}
                                    </div>)}
                            </div>
                        </div>
                    </ul>
                </div>
            </div>

        </div>
    )
}