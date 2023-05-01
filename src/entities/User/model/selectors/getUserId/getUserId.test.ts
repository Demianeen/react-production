import type { StateSchema } from 'app/providers/StoreProvider'
import { getUserId } from './getUserId'

describe('getUserId', () => {
  it('should return the id', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {
          id: 1,
        },
      },
    }
    expect(getUserId(state as StateSchema)).toBe(1)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getUserId(state as StateSchema)).toBe(undefined)
  })
})
