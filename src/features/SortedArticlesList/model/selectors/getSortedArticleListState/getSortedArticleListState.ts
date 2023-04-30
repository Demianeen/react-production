import type { StateSchema } from 'app/providers/StoreProvider'

export const getSortedArticleListState = (
  state: StateSchema
) => state?.sortedArticleList
