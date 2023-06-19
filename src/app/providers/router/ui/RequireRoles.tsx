import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { UserRole } from '@/entities/User'
import { getUserRoles } from '@/entities/User'

import { routes } from '@/shared/lib/router/routes'

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

    return requiredRoles.some((role) => userRoles.includes(role))
  }, [requiredRoles, userRoles])

  if (!hasRequiredRoles) {
    return <Navigate to={routes.forbidden()} replace />
  }

  return children
}
