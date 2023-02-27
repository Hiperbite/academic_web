import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import storage from '../../storage'
import { selectCurrentToken } from './authSlice'

export const RequireAuth = () => {


    const token = storage.get('token')

    const location = useLocation()
    return (
        token
            ? <Outlet />
            : <Navigate to="/auth" state={{ from: location }} replace />)

}
