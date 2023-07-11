import { AppRoutes } from '@/shared/const/router/appRoutes'
import { RoutePath } from '@/shared/const/router/routePath'
import { useEffect, useState } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

/**
 * Returns the current app route name based on the current URL pathname.
 *
 * @returns The current app route (e.g.`AppRoutes.HOME`), or `undefined` if no matching route is found.
 */
export const useCurrentRoutePath = () => {
  const { pathname } = useLocation()
  const [appRoute, setAppRoute] = useState<AppRoutes>()

  useEffect(() => {
    const pathArray = Object.entries(RoutePath)

    const [routeName] =
      pathArray.find(
        ([_, routePattern]) =>
          matchPath(routePattern, pathname) !== null
      ) ?? []

    setAppRoute(routeName as AppRoutes)
  }, [pathname])

  return appRoute ?? AppRoutes.NOT_FOUND
}
