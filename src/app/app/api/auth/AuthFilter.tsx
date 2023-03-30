import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import storage from '../../storage'
import { selectCurrentToken } from './authSlice'


import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const AuthFilter = ({roles }: any) => {
    
    const location = useLocation()
    const requireAuth = ['/auth'].filter((route: string) => location.pathname.indexOf(route) > -1).length === 0

    if (!requireAuth)
        return <Outlet />

    const token = storage.get('token')

    return (
        token
            ? <Outlet />
            : <Navigate to="/auth" state={{ from: location }} replace />)

}
export const AuthFilterorization = ({ permission }: any) => {


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