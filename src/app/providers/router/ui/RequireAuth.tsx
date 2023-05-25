import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'

import { RoutePath } from '@/shared/config/routeConfig/routePath'

export const RequireAuth = ({
  children,
}: {
  children: JSX.Element
}) => {
  const auth = useSelector(getUserAuthData)
  const location = useLocation()

  if (auth === undefined) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate
        to={RoutePath.home}
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}
