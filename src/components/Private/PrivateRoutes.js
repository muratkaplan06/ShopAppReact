import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

import React from 'react'

function PrivateRoutes() {
  const { loggedIn } = useAuth()
  console.log(loggedIn)
  return { loggedIn } ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
