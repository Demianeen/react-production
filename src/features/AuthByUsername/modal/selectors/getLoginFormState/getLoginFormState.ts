import type { StateSchema } from 'app/providers/StoreProvider'

export const getLoginFormState = (state: StateSchema) =>
  state.loginForm
