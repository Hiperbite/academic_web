import React, { useState } from 'react'
import { Fade } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logoutHandlerData } from '../../app/api/auth/authentication';

export const ProfileMenu = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logoutHandlerData()
        navigate('/')
    }
    return (
        <div className="dropdown az-profile-menu">
            <a href='#' className="az-img-user" onClick={() => setOpen(!open)}>
                <img src="../img/faces/face1.jpg" alt="" />
            </a>

            <Fade in={open}>
                <div className="dropdown-menu" style={{ 'display': 'block' }}>
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

                    <Link to="" className="dropdown-item">
                        <i className="typcn typcn-user-outline"></i> My Profile</Link>
                    <Link to="" className="dropdown-item">
                        <i className="typcn typcn-edit"></i> Edit Profile</Link>
                    <Link to="" className="dropdown-item">
                        <i className="typcn typcn-time"></i> Activity Logs</Link>
                    <Link to="" className="dropdown-item">
                        <i className="typcn typcn-cog-outline"></i> Account Settings</Link>
                    <Link to="" className="dropdown-item" onClick={handleLogOut}>
                        <i className="typcn typcn-power-outline"></i> Sign Out</Link>
                </div>{/* dropdown-menu */}
            </Fade>
        </div>
    )
}
