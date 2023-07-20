import { ArticleType } from '@/entities/Article'
import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListType,
  getArticleInfiniteListType,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.type ?? ArticleType.ALL
)
