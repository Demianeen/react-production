import { buildSelector } from '@/shared/lib/store'
import { getArticleCommentListState } from '../getArticleCommentListState/getArticleCommentListState'

export const [
  useArticleCommentListError,
  getArticleCommentListError,
] = buildSelector(getArticleCommentListState, (state) => state?.error)
