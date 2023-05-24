import { AboutPage } from 'pages/AboutPage'
import { HomePage } from 'pages/HomePage'
import type { RouteProps } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage'
import { ArticlesPage } from 'pages/ArticlesPage'
import { ArticleEditPage } from 'pages/ArticleEditPage'
import { AdminPanelPage } from 'pages/AdminPanelPage'
import { UserRole } from 'entities/User'
import { ForbiddenPage } from 'pages/ForbiddenPage'
import { AppRoutes } from './appRoutes'
import { RoutePath } from './routePath'

export type AppRouteProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
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
      path: `${RoutePath.profile}:id`,
      element: <ProfilePage />,
      authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
      path: RoutePath.articles,
      element: <ArticlesPage />,
      authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
      path: `${RoutePath.article_details}:id`,
      element: <ArticleDetailsPage />,
      authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
      path: RoutePath.article_create,
      element: <ArticleEditPage />,
    },
    [AppRoutes.ARTICLE_EDIT]: {
      path: RoutePath.article_edit,
      element: <ArticleEditPage />,
    },
    [AppRoutes.ADMIN_PANEL]: {
      path: RoutePath.admin_panel,
      element: <AdminPanelPage />,
      authOnly: true,
      roles: [UserRole.ADMIN, UserRole.MANAGER],
    },
    [AppRoutes.FORBIDDEN]: {
      path: RoutePath.forbidden,
      element: <ForbiddenPage />,
    },

    // always keep this last
    [AppRoutes.NOT_FOUND]: {
      path: RoutePath.not_found,
      element: <NotFoundPage />,
    },
  }
