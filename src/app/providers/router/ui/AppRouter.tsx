import React, { memo, Suspense, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import type { AppRouteProps } from 'shared/config/routeConfig/routeConfig'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'
import { RequireAuth } from 'app/providers/router/ui/RequireAuth'
import { RequireRoles } from 'app/providers/router/ui/RequireRoles'

export const AppRouter = memo(() => {
  const routes = useMemo(() => {
    return Object.values(routeConfig).map(
      (route: AppRouteProps) => {
        const wrappedElement = (
          <Suspense fallback={<PageLoader />}>
            {route.element}
          </Suspense>
        )

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.authOnly ? (
                <RequireAuth>
                  <RequireRoles requiredRoles={route.roles}>
                    {wrappedElement}
                  </RequireRoles>
                </RequireAuth>
              ) : (
                wrappedElement
              )
            }
          />
        )
      }
    )
  }, [])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{routes}</Routes>
    </Suspense>
  )
})

AppRouter.displayName = 'AppRouter'
