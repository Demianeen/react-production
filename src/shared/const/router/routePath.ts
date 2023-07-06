import { routes } from '@/shared/lib/router/routes'
import { AppRoutes } from './appRoutes'

export const RoutePath: Record<
  AppRoutes,
  ReturnType<(typeof routes)[keyof typeof routes]>
> = {
  [AppRoutes.HOME]: routes.home(),
  [AppRoutes.ABOUT]: routes.about(),
  [AppRoutes.PROFILE]: routes.profile({ id: ':id' }),
  [AppRoutes.SETTINGS]: routes.settings(),
  [AppRoutes.ARTICLES]: routes.articles(),
  [AppRoutes.ARTICLE_DETAILS]: routes.articleDetails({
    id: ':id',
  }),
  [AppRoutes.ARTICLE_CREATE]: routes.articleCreate(),
  [AppRoutes.ARTICLE_EDIT]: routes.articleEdit({
    id: ':id',
  }),
  [AppRoutes.ADMIN_PANEL]: routes.adminPanel(),
  [AppRoutes.FORBIDDEN]: routes.forbidden(),

  // always keep this last
  [AppRoutes.NOT_FOUND]: '*',
}
