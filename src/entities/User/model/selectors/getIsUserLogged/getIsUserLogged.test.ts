import type { StateSchema } from '@/app/providers/StoreProvider'
import { getIsUserLogged } from './getIsUserLogged'

describe('getUserIsLogged', () => {
  it('should return the isLogged', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {},
      },
    }
    expect(getIsUserLogged(state as StateSchema)).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getIsUserLogged(state as StateSchema)).toEqual(false)
  })
})
