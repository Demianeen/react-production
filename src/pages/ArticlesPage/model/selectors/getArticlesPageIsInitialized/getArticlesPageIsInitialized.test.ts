import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticlesPageIsInitialized } from './getArticlesPageIsInitialized'

describe('getArticlesPageIsInitialized', () => {
  it('should return the isInitialized', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        _isInitialized: true,
      },
    }
    expect(
      getArticlesPageIsInitialized(state as StateSchema)
    ).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticlesPageIsInitialized(state as StateSchema)
    ).toEqual(false)
  })
})
