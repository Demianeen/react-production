import React, { memo, Suspense, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'

export const AppRouter = memo(() => {
  const isAuth = useSelector(getUserAuthData)

  const routes = useMemo(() => {
    const allRoutes = Object.values(routeConfig)
    const authRoutes = allRoutes.filter(
      (route) => !(route.authOnly && !isAuth)
    )
    return authRoutes.map(({ path, element }) => (
      <Route
        key={path}
        path={path}
        element={
          <div className='pageWrapper'>{element}</div>
        }
      />
    ))
  }, [isAuth])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{routes}</Routes>
    </Suspense>
  )
})

AppRouter.displayName = 'AppRouter'
