import Moment from "react-moment"



export const EventsStudents = ({ student }: any) => {
    return (
        <div className="col-lg-6">
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <h6 className="card-title">Historico</h6>
                    <p className="card-text"></p>
                </div>
                <div className="card-body">
                    <div className="az-list-item">
                        <div>
                            <h6>1- Registo</h6>
                            <span>
                                <Moment format="DD/MM/YYYY">
                                    {student.createdAt}
                                </Moment></span>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}