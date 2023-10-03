import type { StateSchema } from '@/app/providers/StoreProvider'
import { getArticleDetailsCanEdit } from './getArticleDetailsCanEdit'

describe('getArticleDetailsCanEdit', () => {
  it('should return the canEdit true', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {
          id: 1,
        },
      },
    }

    expect(getArticleDetailsCanEdit(state as StateSchema, 1)).toEqual(
      true,
    )
  })

  it('should return the canEdit false', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {
          id: 2,
        },
      },
    }

    expect(getArticleDetailsCanEdit(state as StateSchema, 1)).toEqual(
      false,
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsCanEdit(state as StateSchema, undefined),
    ).toEqual(false)
  })
})
