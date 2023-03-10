import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routeConfig).map(
          ({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <div className='pageWrapper'>{element}</div>
              }
            />
          )
        )}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
