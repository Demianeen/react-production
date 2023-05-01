import { AboutPage } from 'pages/AboutPage'
import { HomePage } from 'pages/HomePage'
import type { RouteProps } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage'
import { ArticlesPage } from 'pages/ArticlesPage'
import { ArticleEditPage } from 'pages/ArticleEditPage'

export type AppRouteProps = RouteProps & {
  authOnly?: boolean
}

export enum AppRoutes {
  HOME = 'home',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',

  // always keep this last
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile/', // + :id
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id
  [AppRoutes.ARTICLE_CREATE]: '/articles/new',
  [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',

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

    // always keep this last
    [AppRoutes.NOT_FOUND]: {
      path: RoutePath.not_found,
      element: <NotFoundPage />,
    },
  }