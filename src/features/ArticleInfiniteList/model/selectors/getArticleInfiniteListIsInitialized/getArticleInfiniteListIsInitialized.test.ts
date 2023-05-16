import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleInfiniteListIsInitialized } from './getArticleInfiniteListIsInitialized'

describe('getArticleInfiniteListIsInitialized', () => {
  it('should return the isInitialized', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        _isInitialized: true,
      },
    }
    expect(
      getArticleInfiniteListIsInitialized(
        state as StateSchema
      )
    ).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListIsInitialized(
        state as StateSchema
      )
    ).toEqual(false)
  })
})
