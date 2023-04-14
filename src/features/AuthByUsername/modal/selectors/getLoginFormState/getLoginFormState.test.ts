import type { StateSchema } from 'app/providers/StoreProvider'
import { loginFormSliceName } from 'features/AuthByUsername'
import { getLoginFormState } from './getLoginFormState'

describe('getLoginFormState', () => {
  it('should return the login form state', () => {
    const state: DeepPartial<StateSchema> = {
      [loginFormSliceName]: {
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
