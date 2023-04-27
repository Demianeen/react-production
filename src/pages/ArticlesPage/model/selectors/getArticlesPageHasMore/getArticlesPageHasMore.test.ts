import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticlesPageHasMore } from './getArticlesPageHasMore'

describe('getArticlesPageHasMore', () => {
  it('should return the hasMore', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        hasMore: false,
      },
    }
    expect(
      getArticlesPageHasMore(state as StateSchema)
    ).toEqual(false)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticlesPageHasMore(state as StateSchema)
    ).toEqual(true)
  })
})
