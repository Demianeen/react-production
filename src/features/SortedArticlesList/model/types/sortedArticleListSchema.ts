import type { SortOrder } from 'shared/types/sort'
import type {
  ArticleSortField,
  ArticleType,
} from 'entities/Article/model/types/article'
import type { View } from 'entities/View'

export interface SortedArticleListSchema {
  order: SortOrder
  sort: ArticleSortField
  search: string
  view: View
  type: ArticleType
}
