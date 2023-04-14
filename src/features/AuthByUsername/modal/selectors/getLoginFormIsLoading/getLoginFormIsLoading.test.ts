import type { StateSchema } from 'app/providers/StoreProvider'
import { loginFormSliceName } from 'features/AuthByUsername'
import { getLoginFormIsLoading } from './getLoginFormIsLoading'

describe('getLoginFormIsLoading', () => {
  it('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      [loginFormSliceName]: {
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
