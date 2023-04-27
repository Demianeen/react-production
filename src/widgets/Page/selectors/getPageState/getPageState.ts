import type { StateSchema } from 'app/providers/StoreProvider'

export const getPageState = (state: StateSchema) =>
  state.page
