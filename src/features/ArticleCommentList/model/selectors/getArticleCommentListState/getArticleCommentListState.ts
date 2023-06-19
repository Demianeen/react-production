import type { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleCommentListState = (state: StateSchema) =>
  state.articleCommentList
