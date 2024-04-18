import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const DashboardProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.user)
    if (user?.role === 'admin' || user?.role === 'test') {
        return children
    }
    return (
        <Navigate to='/login' />
    )
}

export default DashboardProtectedRoute
