import Moment from "react-moment"

export const DocumentStudents = ({ student }: any) => {
    return (
        <div className="col-lg-6">
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <h6 className="card-title">Documentos de suporte</h6>
                    <p className="card-text">...</p>
                </div>
                <div className="card-body">
                    {student?.person?.documents?.map((document: any) =>
                        <div className="az-list-item">
                            <div>
                                <span>{document?.type}</span>
                                <h6 className="tx-primary">{document?.number ?? '-'}</h6>
                            </div>
                            <div>
                                <span>
                                    Emitido aos: <Moment format="DD/MM/YYYY">
                                        {document?.issueDate}
                                    </Moment>
                                </span>
                                {document?.validationDate ?
                                    <>
                                        <br />
                                        <span>
                                            Valido ate: <Moment format="DD/MM/YYYY">
                                                {document?.validationDate}
                                            </Moment>
                                        </span></> : ''}
                            </div>
                            <div>
                                <span>Baixas</span>
                            </div>
                        </div>)}

                </div>
            </div>

        </div>
    )
}