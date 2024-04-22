import React from 'react'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'

const { unAuthenticatedEntryPath } = appConfig

function ProtectedRoute() {
  const { authenticated } = useAuth()

  const location = useLocation()

  if (!authenticated) {
    return (
      <Navigate
        to={location.pathname.includes('activar-cuenta') ? `${location.pathname}` :`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
