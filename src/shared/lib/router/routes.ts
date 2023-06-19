import type { AppRoutes } from '@/shared/const/router/appRoutes'

export const routes = {
  home: () => '/',
  about: () => '/about',
  profile: ({ id }: { id: string }) => `/profile/${id}`,
  articles: () => '/articles',
  articleDetails: ({ id }: { id: string }) => `/articles/${id}`,
  articleCreate: () => '/articles/new',
  articleEdit: ({ id }: { id: string }) => `/articles/${id}/edit`,
  adminPanel: () => '/admin',
  forbidden: () => '/forbidden',
} satisfies Record<
  Exclude<AppRoutes, AppRoutes.NOT_FOUND>,
  (arg: any) => string
>
