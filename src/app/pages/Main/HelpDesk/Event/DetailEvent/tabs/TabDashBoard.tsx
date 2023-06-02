
export const TabDashBoard = ({ course }: any) => {
const countStudents=course?.classes?.map((c:any)=>c?.enrollmentConfirmations)
    return (<>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            {JSON.stringify(countStudents)}
            <div className="row row-sm">
                <div className="col-sm-3">
                    <div className="card card-dashboard-two">
                        <div className="card-header">
                            <h6>{course?.classes?.length} <i className="icon ion-md-trending-up tx-success"></i> <small>18.02%</small>
                            </h6>
                            <p>Turmas</p>
                        </div>
                        <div className="card-body">
                            <div className="chart-wrapper">
                                <div id="flotChart1" className="flot-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 mg-t-20 mg-sm-t-0">
                    <div className="card card-dashboard-two">
                        <div className="card-header">
                            <h6>86k <i className="icon ion-md-trending-down tx-danger"></i> <small>0.86%</small>
                            </h6>
                            <p>Estudantes activos</p>
                        </div>
                        <div className="card-body">
                            <div className="chart-wrapper">
                                <div id="flotChart2" className="flot-chart">
                                </div>
                            </div>
                        </div>
                    </div>
                </div><div className="col-sm-3 mg-t-20 mg-sm-t-0">
                    <div className="card card-dashboard-two">
                        <div className="card-header">
                            <h6>12 <i className="icon ion-md-trending-down tx-danger"></i> <small>0.86%</small>
                            </h6>
                            <p>Turmas de aulas</p>
                        </div>
                        <div className="card-body">
                            <div className="chart-wrapper">
                                <div id="flotChart2" className="flot-chart">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 mg-t-20">
                    <div className="card card-dashboard-three">
                        <div className="card-header">
                            <p>All Sessions</p>
                            <h6>16,869 <small className="tx-success"><i className="icon ion-md-arrow-up"></i> 2.87%</small>
                            </h6>
                            <small>The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc.</small>
                        </div>
                        <div className="card-body">
                            <div className="chart">
                                <canvas id="chartBar5"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
