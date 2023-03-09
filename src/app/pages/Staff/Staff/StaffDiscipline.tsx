export const StaffDiscipline = ({ staff }: any) => {
    return (
        <div className="col-lg-8">
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <h6 className="card-title">Disciplinas e habilidades</h6>
                    <p className="card-text"></p>
                </div>
                <div className="card-body">
                    {staff?.disciplines?.map((dicipline: any) =>
                        <div className="az-list-item">
                            <div>
                                <h6></h6>
                                <span>{JSON.stringify(dicipline)}</span>
                            </div>
                            <div>
                                <h6 className="tx-primary"></h6>
                                <span></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}