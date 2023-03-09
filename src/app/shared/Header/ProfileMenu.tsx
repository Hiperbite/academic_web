import React, { useMemo, useState } from 'react'
import { Fade } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logoutHandlerData } from '../../app/api/auth/authentication';
import storage from '../../app/storage';

export const ProfileMenu = () => {
    const [open, setOpen] = useState(false);
    const [me, setMe] = useState<any>();
    const navigate = useNavigate();


    useMemo(() => {
        setMe(storage.get('user'))
    }, [])
    const handleLogOut = () => {
        logoutHandlerData()
        navigate('/')
    }
    return (
        <div className="dropdown az-profile-menu">
            <a href='#' className="az-img-user" onClick={() => setOpen(!open)}>
                <img src={me?.avatar} alt="" />
            </a>

            {open ?
                <div className="dropdown-menu" style={{ 'display': 'block' }}>
                    <div className="az-dropdown-header d-sm-none">
                        <Link to="" className="az-header-arrow"><i className="icon ion-md-arrow-back"></i></Link>
                    </div>
                    <div className="az-header-profile">
                        <div className="az-img-user">
                            <img src={me?.avatar} alt="" />
                        </div>{/* az-img-user */}
                        <h6>{me?.person?.firstName} {me?.person?.lastName}</h6>
                        
                        <span>{me?.email}</span>
                    </div>{/* az-header-profile */}

                    <Link to="/me" className="dropdown-item">
                        <i className="typcn typcn-user-outline"></i> Meu Perfil</Link>
                    <Link to="" className="dropdown-item">
                        <i className="typcn typcn-edit"></i> Edit Profile</Link>
                    <Link to="" className="dropdown-item">
                        <i className="typcn typcn-time"></i> Activity Logs</Link>
                    <Link to="" className="dropdown-item">
                        <i className="typcn typcn-cog-outline"></i> Account Settings</Link>
                    <Link to="" className="dropdown-item" onClick={handleLogOut}>
                        <i className="typcn typcn-power-outline"></i> Sign Out</Link>
                </div>
 : null}
        </div>
    )
}
