import { lazy } from 'react'

export const CreateArticlePageAsync = lazy(
  () => import('./CreateArticlePage'),
)
