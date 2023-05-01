import type { SortOrder } from 'shared/types/sort'
import type { ArticleType } from 'entities/Article/model/types/article'
import type { View } from 'entities/View'

export enum ArticleSortField {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED_AT = 'createdAt',
}

export interface SortedArticleListSchema {
  order: SortOrder
  sort: ArticleSortField
  search: string
  view: View
  type: ArticleType
}
