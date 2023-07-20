import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'
import { INITIAL_ARTICLE_VIEW } from '../../const/view'

export const [
  useArticleInfiniteListView,
  getArticleInfiniteListView,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.view ?? INITIAL_ARTICLE_VIEW
)
