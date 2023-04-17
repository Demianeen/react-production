import { AboutPage } from 'pages/AboutPage'
import { HomePage } from 'pages/HomePage'
import type { RouteProps } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'

export type AppRouteProps = RouteProps & {
  authOnly?: boolean
}

export enum AppRoutes {
  HOME = 'home',
  ABOUT = 'about',
  PROFILE = 'profile',

  // always keep this last
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile',

  // always keep this last
  [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRouteProps> =
  {
    [AppRoutes.HOME]: {
      path: RoutePath.home,
      element: <HomePage />,
    },
    [AppRoutes.ABOUT]: {
      path: RoutePath.about,
      element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
      path: RoutePath.profile,
      element: <ProfilePage />,
      authOnly: true,
    },

    // always keep this last
    [AppRoutes.NOT_FOUND]: {
      path: RoutePath.not_found,
      element: <NotFoundPage />,
    },
  }
