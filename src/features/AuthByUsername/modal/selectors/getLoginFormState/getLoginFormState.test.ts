import type { StateSchema } from 'app/providers/StoreProvider'
import { getLoginFormState } from './getLoginFormState'

describe('getLoginFormState', () => {
  it('should return the login form state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
        username: '',
        password: '',
      },
    }
    expect(getLoginFormState(state as StateSchema)).toEqual(
      state.loginForm
    )
  })
})
