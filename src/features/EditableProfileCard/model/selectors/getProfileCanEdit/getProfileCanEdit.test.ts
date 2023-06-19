import type { StateSchema } from '@/app/providers/StoreProvider'
import { getProfileCanEdit } from './getProfileCanEdit'

describe('getProfileCanEdit', () => {
  it('should return the canEdit true', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: {
          id: 1,
        },
      },
      user: {
        authData: {
          id: 1,
        },
      },
    }

    expect(getProfileCanEdit(state as StateSchema)).toEqual(true)
  })

  it('should return the canEdit false', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: {
          id: 1,
        },
      },
      user: {
        authData: {
          id: 2,
        },
      },
    }

    expect(getProfileCanEdit(state as StateSchema)).toEqual(false)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileCanEdit(state as StateSchema)).toEqual(false)
  })
})
