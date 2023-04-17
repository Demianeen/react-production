import React, { memo, Suspense, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import type { AppRouteProps } from 'shared/config/routeConfig/routeConfig'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'
import { RequireAuth } from 'app/providers/router/ui/RequireAuth'

export const AppRouter = memo(() => {
  const routes = useMemo(() => {
    return Object.values(routeConfig).map(
      (route: AppRouteProps) => {
        const wrappedElement = (
          <div className='pageWrapper'>{route.element}</div>
        )
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.authOnly ? (
                <RequireAuth>{wrappedElement}</RequireAuth>
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
