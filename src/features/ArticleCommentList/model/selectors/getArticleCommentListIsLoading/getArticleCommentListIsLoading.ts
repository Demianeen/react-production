import { buildSelector } from '@/shared/lib/store'
import { getArticleCommentListState } from '../getArticleCommentListState/getArticleCommentListState'

export const [
  useArticleCommentListIsLoading,
  getArticleCommentListIsLoading,
] = buildSelector(
  getArticleCommentListState,
  (state) => state?.isLoading ?? false
)
