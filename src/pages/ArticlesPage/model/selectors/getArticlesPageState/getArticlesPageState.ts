import type { StateSchema } from 'app/providers/StoreProvider'

export const getArticlesPageState = (state: StateSchema) =>
  state.articlesPage
