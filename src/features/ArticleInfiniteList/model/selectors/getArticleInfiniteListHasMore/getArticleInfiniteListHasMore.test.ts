import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleInfiniteListHasMore } from './getArticleInfiniteListHasMore'

describe('getArticleInfiniteListHasMore', () => {
  it('should return the hasMore', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        hasMore: false,
      },
    }
    expect(
      getArticleInfiniteListHasMore(state as StateSchema)
    ).toEqual(false)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListHasMore(state as StateSchema)
    ).toEqual(true)
  })
})
