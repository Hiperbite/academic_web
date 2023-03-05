import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../app/api/auth/authSlice";
import { ProfileMenu } from "./ProfileMenu";

const menuItems = [
    { to: '/home', text: 'Dashboard', active: false },
    { to: '/students', text: 'Estudantes', active: false },
    { to: '#', text: 'Pessoal', active: false },
    { to: '/pedagogical', text: 'Pedagógico', active: false },
    { to: '#', text: 'Biblioteca', active: false },
    { to: '#', text: 'Acervo Digital', active: false },
    { to: '#', text: 'Definições', active: false },

];
export const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    const [activeMenu, setActiveMenu] = useState(
        menuItems.filter((x: any) => window.location.href.indexOf(x.to) > -1)[0] ??
        menuItems[0]
    )
    const _handleClick = (menuItem: any) => {
        setActiveMenu(menuItem);
    }

    const user = useSelector(selectCurrentUser);
    const classNames = ["nav-item active", "nav-item"];
    return <div className="az-header">
        <div className="container">
            <div className="az-header-left">
                <Link to="/" className="az-logo"><span></span> azia
                </Link>
                <Link to="/" className="az-header-menu-icon d-lg-none"><span></span></Link>
            </div>{/* az-header-left */}
            <div className="az-header-menu">
                <div className="az-header-menu-header">
                    <Link to="/" className="az-logo"><span></span> azia</Link>
                    <Link to="/" className="close">&times;</Link>
                </div>{/* az-header-menu-header */}
                <ul className="nav">
                    {menuItems.map((menuItem: any) =>

                        <li className={classNames[activeMenu.to === menuItem.to ? 0 : 1]} >
                            <Link
                                onClick={() => setActiveMenu(menuItem)}
                                to={menuItem.to}
                                className="nav-link"
                            >

                                <i className="far fa-exclamation"></i> {menuItem.text}
                            </Link>
                        </li>
                    )}
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
                <ProfileMenu/>
            </div>{/* az-header-right */}
        </div>{/* container */}
    </div >
}