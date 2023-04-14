import type { StateSchema } from 'app/providers/StoreProvider'
import { loginFormSliceName } from 'features/AuthByUsername'
import { getLoginFormError } from './getLoginFormError'

describe('getLoginFormError', () => {
  it('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      [loginFormSliceName]: {
        error: 'error',
        isLoading: false,
        username: '',
        password: '',
      },
    }
    expect(getLoginFormError(state as StateSchema)).toEqual(
      'error'
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginFormError(state as StateSchema)).toEqual(
      undefined
    )
  })
})
