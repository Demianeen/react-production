import { AppRoutes } from '@/shared/const/router/appRoutes'

export const routes = {
  [AppRoutes.HOME]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
  [AppRoutes.PROFILE]: ({ id }: { id: string }) =>
    `/profile/${id}`,
  [AppRoutes.ARTICLES]: () => '/articles',
  [AppRoutes.ARTICLE_DETAILS]: ({ id }: { id: string }) =>
    `/articles/${id}`,
  [AppRoutes.ARTICLE_CREATE]: () => '/articles/new',
  [AppRoutes.ARTICLE_EDIT]: ({ id }: { id: string }) =>
    `/articles/${id}/edit`,
  [AppRoutes.ADMIN_PANEL]: () => '/admin',
  [AppRoutes.FORBIDDEN]: () => '/forbidden',
} satisfies Record<
  Exclude<AppRoutes, AppRoutes.NOT_FOUND>,
  (arg: any) => string
>
