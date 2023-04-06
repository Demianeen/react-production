import type { DeepPartial } from '@reduxjs/toolkit'
import { getLoginFormIsLoading } from 'features/AuthByUsername/modal/selectors/getLoginFormIsLoading/getLoginFormIsLoading'
import type { StateSchema } from 'app/providers/StoreProvider'

describe('getLoginFormIsLoading', () => {
  it('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
        username: '',
        password: '',
      },
    }

    expect(
      getLoginFormIsLoading(state as StateSchema)
    ).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(
      getLoginFormIsLoading(state as StateSchema)
    ).toEqual(false)
  })
})
