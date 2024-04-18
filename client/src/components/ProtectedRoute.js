import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toggleLoginPage } from '../Features/user/userSlice'

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.user)
    if (!user) {
        return <Navigate to='/' />
    }
    return children
}

export default ProtectedRoute
