import { getLoginFormError } from 'features/AuthByUsername/modal/selectors/getLoginFormError/getLoginFormError'

import type { StateSchema } from 'app/providers/StoreProvider'
import { getLoginFormIsLoading } from 'features/AuthByUsername/modal/selectors/getLoginFormIsLoading/getLoginFormIsLoading'

describe('getLoginFormError', () => {
  it('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
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
    expect(
      getLoginFormIsLoading(state as StateSchema)
    ).toEqual(false)
  })
})
