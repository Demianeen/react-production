import { useMemo } from 'react'
import type { UserRole } from 'entities/User'
import { getUserRoles } from 'entities/User'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { RoutePath } from 'shared/config/routeConfig/routePath'

interface RequireRolesProps {
  children: JSX.Element
  requiredRoles?: UserRole[]
}

export const RequireRoles = ({
  children,
  requiredRoles,
}: RequireRolesProps) => {
  const userRoles = useSelector(getUserRoles)
  const hasRequiredRoles = useMemo(() => {
    if (requiredRoles === undefined) {
      return true
    }

    return requiredRoles.some((role) =>
      userRoles.includes(role)
    )
  }, [requiredRoles, userRoles])

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath.forbidden} replace />
  }

  return children
}
