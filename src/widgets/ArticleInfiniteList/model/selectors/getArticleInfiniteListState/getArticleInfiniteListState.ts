import type { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleInfiniteListState = (state: StateSchema) =>
  state.articleInfiniteList
