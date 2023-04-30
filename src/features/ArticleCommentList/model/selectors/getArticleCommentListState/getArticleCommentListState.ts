import type { StateSchema } from 'app/providers/StoreProvider'

export const getArticleCommentListState = (
  state: StateSchema
) => state.articleDetailsFooter?.comments
