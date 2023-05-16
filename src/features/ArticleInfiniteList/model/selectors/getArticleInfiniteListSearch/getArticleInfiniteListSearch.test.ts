import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleInfiniteListSearch } from './getArticleInfiniteListSearch'

describe('getArticleInfiniteListSearch', () => {
  it('should return the search', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        search: 'query',
      },
    }
    expect(
      getArticleInfiniteListSearch(state as StateSchema)
    ).toEqual('query')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListSearch(state as StateSchema)
    ).toEqual('')
  })
})
