import { memo, Suspense, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '@/app/providers/router/config/routeConfig'
import { PageLoader } from '@/widgets/PageLoader'
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth'
import { RequireRoles } from '@/app/providers/router/ui/RequireRoles'
import type { AppRouteProps } from '@/shared/types/router'

export const AppRouter = memo(() => {
  const routes = useMemo(() => {
    return Object.values(routeConfig).map((route: AppRouteProps) => {
      const wrappedElement = (
        <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
      )

      console.log('route', route)

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
    })
  }, [])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{routes}</Routes>
    </Suspense>
  )
})

AppRouter.displayName = 'AppRouter'
