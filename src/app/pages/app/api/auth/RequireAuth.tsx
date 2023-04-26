import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import storage from '../../storage'
import { selectCurrentToken } from './authSlice'


import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const RequireAuth = () => {


    const token = storage.get('token')

    const location = useLocation()
    return (
        token
            ? <Outlet />
            : <Navigate to="/auth" state={{ from: location }} replace />)

}

export const allowed = (role: string, level = 1) => {
    const user = storage.get('user')
    if (user) { } else { return false }
    const { permissions } = user;

    return permissions[role] >= level || permissions['ADMIN'] >= level
}
export const AllowedFor = ({ role, level = 1, showLocked, children }: any) => {
    if (role) { } else { return children }

    const allow = allowed(role, level)

    return (allow ? children : <LockedComponent showLocked={showLocked} />)

}
export const LockedComponent = ({ showLocked = false }: any) => showLocked ? <div className='text-center text-secondary'><i className='fa fa-lock'></i> Sem acesso</div> : <></>
export const RequireAuthorization = ({ permission }: any) => {


    const token = storage.get('user').permissions.filter(([perm, level]: any) => permission === perm);

    const location = useLocation()
    return (
        token
            ? <Outlet />
            : <Navigate to="/auth" state={{ from: location }} replace />)

}



const ShowForPermissionComponent = (props: any) => {
    const couldShow = props.userPermissions.includes(props.permission);
    return couldShow ? props.children : null;
};

ShowForPermissionComponent.propTypes = {
    permission: PropTypes.string.isRequired,
    userPermissions: PropTypes.array.isRequired
};


const mapStateToProps = (state: any) => ({
    userPermissions: state.user.permission //<--- here you will get permissions for your user from Redux store
});

export const ShowForPermission = connect(mapStateToProps)(ShowForPermissionComponent);


/*
How to use

 <ShowForPermission permission="DELETE">
                <button>Delete</button>
            </ShowForPermission>


*/