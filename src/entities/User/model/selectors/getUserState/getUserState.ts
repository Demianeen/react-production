import type { StateSchema } from 'app/providers/StoreProvider'

export const getUserState = (state: StateSchema) =>
  state?.user
