
import { Link } from "react-router-dom"

export const Students = () => {


    return (<div className="az-content az-content-dashboard">

        <div className="container">

            <div className="az-content-body">
                <div className="row row-sm mg-b-20">
                    <div className="col-lg-7 ht-lg-100p">
                        <div className="card card-dashboard-one">
                            <div className="card-header">
                                <div>
                                    <h6 className="card-title">xxxWebsite Audience Metrics</h6>
                                    <p className="card-text">Audience to which the users belonged while on the current date range.</p>
                                </div>
                                <div className="btn-group">
                                    <button className="btn active">Day</button>
                                    <button className="btn">Week</button>
                                    <button className="btn">Month</button>
                                </div>
                            </div>{/* card-header */}
                            <div className="card-body">
                                <div className="card-body-top">
                                    <div>
                                        <label className="mg-b-0">Users</label>
                                        <h2>13,956</h2>
                                    </div>
                                    <div>
                                        <label className="mg-b-0">Bounce Rate</label>
                                        <h2>33.50%</h2>
                                    </div>
                                    <div>
                                        <label className="mg-b-0">Page Views</label>
                                        <h2>83,123</h2>
                                    </div>
                                    <div>
                                        <label className="mg-b-0">Sessions</label>
                                        <h2>16,869</h2>
                                    </div>
                                </div>{/* card-body-top */}
                                <div className="flot-chart-wrapper">
                                    <div id="flotChart" className="flot-chart"></div>
                                </div>{/* flot-chart-wrapper */}
                            </div>{/* card-body */}
                        </div>{/* card */}
                    </div>{/* col */}
                    <div className="col-lg-5 mg-t-20 mg-lg-t-0">
                        <div className="row row-sm">
                            <div className="col-sm-6">
                                <div className="card card-dashboard-two">
                                    <div className="card-header">
                                        <h6>33.50% <i className="icon ion-md-trending-up tx-success"></i> <small>18.02%</small></h6>
                                        <p>Bounce Rate</p>
                                    </div>{/* card-header */}
                                    <div className="card-body">
                                        <div className="chart-wrapper">
                                            <div id="flotChart1" className="flot-chart"></div>
                                        </div>{/* chart-wrapper */}
                                    </div>{/* card-body */}
                                </div>{/* card */}
                            </div>{/* col */}
                            <div className="col-sm-6 mg-t-20 mg-sm-t-0">
                                <div className="card card-dashboard-two">
                                    <div className="card-header">
                                        <h6>86k <i className="icon ion-md-trending-down tx-danger"></i> <small>0.86%</small></h6>
                                        <p>Total Users</p>
                                    </div>{/* card-header */}
                                    <div className="card-body">
                                        <div className="chart-wrapper">
                                            <div id="flotChart2" className="flot-chart"></div>
                                        </div>{/* chart-wrapper */}
                                    </div>{/* card-body */}
                                </div>{/* card */}
                            </div>{/* col */}
                            <div className="col-sm-12 mg-t-20">
                                <div className="card card-dashboard-three">
                                    <div className="card-header">
                                        <p></p>
                                        <h1>16,869 <small className="tx-success"><i className="icon ion-md-arrow-up"></i> 2.87%</small></h1>
                                        <small>Número total e actual de estudantes inscritos e com matricula activa</small>
                                    </div>{/* card-header */}
                                    <div className="card-body">
                                        <div className="chart"><canvas id="chartBar5"></canvas></div>
                                    </div>
                                </div>
                            </div>
                        </div>{/* row */}
                    </div>{/*col */}
                </div>{/* row */}

                <div className="row row-sm mg-b-20">
                    <div className="col-lg-4">
                        <div className="card card-dashboard-pageviews">
                            <div className="card-header">
                                <h6 className="card-title">Page Views by Page Title</h6>
                                <p className="card-text">This report is based on 100% of sessions.</p>
                            </div>{/* card-header */}
                            <div className="card-body">
                                <div className="az-list-item">
                                    <div>
                                        <h6>Admin Home</h6>
                                        <span>/demo/admin/index.html</span>
                                    </div>
                                    <div>
                                        <h6 className="tx-primary">7,755</h6>
                                        <span>31.74% (-100.00%)</span>
                                    </div>
                                </div>{/* list-group-item */}
                                <div className="az-list-item">
                                    <div>
                                        <h6>Form Elements</h6>
                                        <span>/demo/admin/forms.html</span>
                                    </div>
                                    <div>
                                        <h6 className="tx-primary">5,215</h6>
                                        <span>28.53% (-100.00%)</span>
                                    </div>
                                </div>{/* list-group-item */}
                                <div className="az-list-item">
                                    <div>
                                        <h6>Utilities</h6>
                                        <span>/demo/admin/util.html</span>
                                    </div>
                                    <div>
                                        <h6 className="tx-primary">4,848</h6>
                                        <span>25.35% (-100.00%)</span>
                                    </div>
                                </div>{/* list-group-item */}
                                <div className="az-list-item">
                                    <div>
                                        <h6>Form Validation</h6>
                                        <span>/demo/admin/validation.html</span>
                                    </div>
                                    <div>
                                        <h6 className="tx-primary">3,275</h6>
                                        <span>23.17% (-100.00%)</span>
                                    </div>
                                </div>{/* list-group-item */}
                                <div className="az-list-item">
                                    <div>
                                        <h6>Modals</h6>
                                        <span>/demo/admin/modals.html</span>
                                    </div>
                                    <div>
                                        <h6 className="tx-primary">3,003</h6>
                                        <span>22.21% (-100.00%)</span>
                                    </div>
                                </div>{/* list-group-item */}
                            </div>{/* card-body */}
                        </div>{/* card */}

                    </div>{/* col */}
                    <div className="col-lg-8 mg-t-20 mg-lg-t-0">
                        <div className="card card-dashboard-four">
                            <div className="card-header">
                                <h6 className="card-title">Últimos inscritos</h6>
                                <Link to="/students/list">Ver mais</Link>
                            </div>{/* card-header */}
                            <div className="card-body row">
                                <div className="table-responsive">
                                    <table className="table table-striped mg-b-0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Salary</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>$320,800</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Garrett Winters</td>
                                                <td>Accountant</td>
                                                <td>$170,750</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Ashton Cox</td>
                                                <td>Junior Technical Author</td>
                                                <td>$86,000</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td>Cedric Kelly</td>
                                                <td>Senior Javascript Developer</td>
                                                <td>$433,060</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">5</th>
                                                <td>Airi Satou</td>
                                                <td>Accountant</td>
                                                <td>$162,700</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>{/* card-body */}
                        </div>{/* card-dashboard-four */}
                    </div>{/* col */}
                </div>{/* row */}

            </div>{/* az-content-body */}
        </div>
    </div>)
}
