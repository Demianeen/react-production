import type { StateSchema } from '@/app/providers/StoreProvider'
import { getArticleDetailsCanEdit } from './getArticleDetailsCanEdit'

describe('getArticleDetailsCanEdit', () => {
  it('should return the canEdit true', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: {
          user: {
            id: 1,
          },
        },
      },
      user: {
        authData: {
          id: 1,
        },
      },
    }

    expect(getArticleDetailsCanEdit(state as StateSchema)).toEqual(
      true
    )
  })

  it('should return the canEdit false', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: {
          user: {
            id: 1,
          },
        },
      },
      user: {
        authData: {
          id: 2,
        },
      },
    }

    expect(getArticleDetailsCanEdit(state as StateSchema)).toEqual(
      false
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getArticleDetailsCanEdit(state as StateSchema)).toEqual(
      false
    )
  })
})
