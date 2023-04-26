import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../app/api/auth/authSlice";
import storage from "../../app/storage";
import { AllowedFor } from "../../pages/app/api/auth/RequireAuth";
import { NotificationMenu } from "./NotificationMenu";
import { ProfileMenu } from "./ProfileMenu";

const menuItems = [
    { to: '/home', text: 'Dashboard' },
    { to: '/students', text: 'Estudantes', allowedFor: 'STUDENTS', level: 1 },
    { to: '/staffs', text: 'Pessoal', allowedFor: 'STAFF', level: 1 },
    { to: '/pedagogical', text: 'Pedagógico', allowedFor: 'ACADEMIC', level: 1 },
    { to: '#', text: 'Biblioteca', active: false, allowedFor: 'ADMIN', level: 4 },
    { to: '#', text: 'Acervo Digital', active: false, allowedFor: 'ADMIN', level: 4 },
    { to: '#', text: 'Definições', active: false, allowedFor: 'ADMIN', level: 4 },

];
export const Header = () => {

    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState(
        menuItems.filter((x: any) => window.location.href.indexOf(x.to) > -1)[0] ??
        menuItems[0]
    )

    const { pathname } = window.location;
    if (pathname.indexOf('/auth')!== 0) {
        debugger
        if (storage.get('user') === null)
            return <Navigate to="/auth" replace />;

        const { role } = storage.get('user')
        if (role === "ROLES_STUDENT") {
            const pp = pathname.indexOf('/me');
            if (pp !== 0) {
                return <Navigate to="/me" replace />;
            }
            return null;
        }
    }

    const classNames = ["nav-item active", "nav-item"];
    return <div className="az-header">
        <div className="container">
            <div className="az-header-left">
                <Link to="/" className="az-logo"><span></span> nova
                </Link>
                <Link to="/" className="az-header-menu-icon d-lg-none"><span></span></Link>
            </div>{/* az-header-left */}
            <div className="az-header-menu">
                <div className="az-header-menu-header">
                    <Link to="/" className="az-logo"><span></span> nova</Link>
                    <Link to="/" className="close">&times;</Link>
                </div>{/* az-header-menu-header */}
                <ul className="nav">
                    {menuItems.map((menuItem: any) =>

                        <li className={classNames[activeMenu.to === menuItem.to ? 0 : 1]} >
                            <AllowedFor role={menuItem.allowedFor} level={menuItem.level}><Link
                                onClick={() => setActiveMenu(menuItem)}
                                to={menuItem.to}
                                className="nav-link"
                            >
                                {menuItem.active === false ? <i className="fa fa-exclamation"></i> : null} {menuItem.text}
                            </Link>
                            </AllowedFor>
                        </li>
                    )}
                </ul>
            </div>{/* az-header-menu */}
            <div className="az-header-right">
                <Link to="" target="_blank" className="az-header-search-link"><i className="fa fa-file-alt"></i></Link>
                <Link to="" className="az-header-search-link"><i className="fa fa-search"></i></Link>
                <div className="az-header-message">
                    <Link to="#"><i className="typcn typcn-messages"></i></Link>
                </div>{/* az-header-message */}
                <NotificationMenu />
                <ProfileMenu />
            </div>{/* az-header-right */}
        </div>{/* container */}
    </div >
}