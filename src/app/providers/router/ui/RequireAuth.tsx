import { Navigate, useLocation } from 'react-router-dom'
import { useUserAuthData } from '@/entities/User'
import { routes } from '@/shared/lib/router/routes'

export const RequireAuth = ({
  children,
}: {
  children: JSX.Element
}) => {
  const auth = useUserAuthData()
  const location = useLocation()

  if (auth === undefined) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate
        to={routes.home()}
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}
