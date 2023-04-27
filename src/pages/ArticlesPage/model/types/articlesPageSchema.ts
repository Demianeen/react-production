import type { Article, ArticleView } from 'entities/Article'
import type { EntityState } from '@reduxjs/toolkit'

export interface ArticlesPageSchema
  extends EntityState<Article> {
  isLoading: boolean
  error?: string

  // TODO: view is more like a feature or entity, not a page
  view: ArticleView

  // pagination
  page: number
  limit?: number
  hasMore: boolean
}
