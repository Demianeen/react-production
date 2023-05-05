import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticlesPageStartIndex } from './getArticlesPageStartIndex'

describe('getArticlesPageStartIndex', () => {
  it('should return the startIndex', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        startIndex: 100,
      },
    }
    expect(
      getArticlesPageStartIndex(state as StateSchema)
    ).toEqual(100)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticlesPageStartIndex(state as StateSchema)
    ).toEqual(0)
  })
})
