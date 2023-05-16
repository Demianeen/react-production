import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleInfiniteListStartIndex } from './getArticleInfiniteListStartIndex'

describe('getArticleInfiniteListStartIndex', () => {
  it('should return the startIndex', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        startIndex: 100,
      },
    }
    expect(
      getArticleInfiniteListStartIndex(state as StateSchema)
    ).toEqual(100)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListStartIndex(state as StateSchema)
    ).toEqual(0)
  })
})
