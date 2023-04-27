import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticlesPageLimit } from './getArticlesPageLimit'

describe('getArticlesPageLimit', () => {
  it('should return the limit', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        limit: 4,
      },
    }
    expect(
      getArticlesPageLimit(state as StateSchema)
    ).toEqual(4)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticlesPageLimit(state as StateSchema)
    ).toEqual(12)
  })
})
