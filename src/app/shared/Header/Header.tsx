import React from "react";
import { Link } from "react-router-dom";
export const Header = () => {

    return <div className="az-header">
        <div className="container">
            <div className="az-header-left">
                <Link to="/" className="az-logo"><span></span> azia</Link>
                <Link to="/"className="az-header-menu-icon d-lg-none"><span></span></Link>
            </div>{/* az-header-left */}
            <div className="az-header-menu">
                <div className="az-header-menu-header">
                    <Link to="/" className="az-logo"><span></span> azia</Link>
                    <Link to="/" className="close">&times;</Link>
                </div>{/* az-header-menu-header */}
                <ul className="nav">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link"><i className="typcn typcn-chart-area-outline"></i> Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/students" className="nav-link"><i className="typcn typcn-document"></i> Estudantes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/persons" className="nav-link"><i className="typcn typcn-document"></i> Pessoal</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/pedagogical" className="nav-link"><i className="typcn typcn-document"></i> Pedagógico</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/virtual-library" className="nav-link"><i className="typcn typcn-document"></i> Biblioteca Virtual</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/digital-Archive" className="nav-link"><i className="typcn typcn-document"></i> Acervo Digital</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Settings" className="nav-link"><i className="typcn typcn-document"></i> Definições</Link>
                    </li>
                </ul>
            </div>{/* az-header-menu */}
            <div className="az-header-right">
                <Link to="https://www.bootstrapdash.com/demo/azia-free/docs/documentation.html" target="_blank" className="az-header-search-link"><i className="far fa-file-alt"></i></Link>
                <Link to="" className="az-header-search-link"><i className="fas fa-search"></i></Link>
                <div className="az-header-message">
                    <Link to="#"><i className="typcn typcn-messages"></i></Link>
                </div>{/* az-header-message */}
                <div className="dropdown az-header-notification">
                    <Link to="" className="new"><i className="typcn typcn-bell"></i></Link>
                    <div className="dropdown-menu">
                        <div className="az-dropdown-header mg-b-20 d-sm-none">
                            <Link to="" className="az-header-arrow"><i className="icon ion-md-arrow-back"></i></Link>
                        </div>
                        <h6 className="az-notification-title">Notifications</h6>
                        <p className="az-notification-text">You have 2 unread notification</p>
                        <div className="az-notification-list">
                            <div className="media new">
                                <div className="az-img-user"><img src="../img/faces/face2.jpg" alt="" /></div>
                                <div className="media-body">
                                    <p>Congratulate <strong>Socrates Itumay</strong> for work anniversaries</p>
                                    <span>Mar 15 12:32pm</span>
                                </div>{/* media-body */}
                            </div>{/* media */}
                            <div className="media new">
                                <div className="az-img-user online"><img src="../img/faces/face3.jpg" alt="" /></div>
                                <div className="media-body">
                                    <p><strong>Joyce Chua</strong> just created a new blog post</p>
                                    <span>Mar 13 04:16am</span>
                                </div>{/* media-body */}
                            </div>{/* media */}
                            <div className="media">
                                <div className="az-img-user"><img src="../img/faces/face4.jpg" alt="" /></div>
                                <div className="media-body">
                                    <p><strong>Althea Cabardo</strong> just created a new blog post</p>
                                    <span>Mar 13 02:56am</span>
                                </div>{/* media-body */}
                            </div>{/* media */}
                            <div className="media">
                                <div className="az-img-user"><img src="../img/faces/face5.jpg" alt="" /></div>
                                <div className="media-body">
                                    <p><strong>Adrian Monino</strong> added new comment on your photo</p>
                                    <span>Mar 12 10:40pm</span>
                                </div>{/* media-body */}
                            </div>{/* media */}
                        </div>{/* az-notification-list */}
                        <div className="dropdown-footer"><Link to="">View All Notifications</Link></div>
                    </div>{/* dropdown-menu */}
                </div>{/* az-header-notification */}
                <div className="dropdown az-profile-menu">
                    <Link to="" className="az-img-user"><img src="../img/faces/face1.jpg" alt="" /></Link>
                    <div className="dropdown-menu">
                        <div className="az-dropdown-header d-sm-none">
                            <Link to="" className="az-header-arrow"><i className="icon ion-md-arrow-back"></i></Link>
                        </div>
                        <div className="az-header-profile">
                            <div className="az-img-user">
                                <img src="../img/faces/face1.jpg" alt="" />
                            </div>{/* az-img-user */}
                            <h6>Aziana Pechon</h6>
                            <span>Premium Member</span>
                        </div>{/* az-header-profile */}

                        <Link to="" className="dropdown-item"><i className="typcn typcn-user-outline"></i> My Profile</Link>
                        <Link to="" className="dropdown-item"><i className="typcn typcn-edit"></i> Edit Profile</Link>
                        <Link to="" className="dropdown-item"><i className="typcn typcn-time"></i> Activity Logs</Link>
                        <Link to="" className="dropdown-item"><i className="typcn typcn-cog-outline"></i> Account Settings</Link>
                        <Link to="page-signin.html" className="dropdown-item"><i className="typcn typcn-power-outline"></i> Sign Out</Link>
                    </div>{/* dropdown-menu */}
                </div>
            </div>{/* az-header-right */}
        </div>{/* container */}
    </div>
}