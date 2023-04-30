import type { StateSchema } from 'app/providers/StoreProvider'
import { getSortedArticleListSearch } from './getSortedArticleListSearch'

describe('getSortedArticleListSearch', () => {
  it('should return the search', () => {
    const state: DeepPartial<StateSchema> = {
      sortedArticleList: {
        search: 'value',
      },
    }
    expect(
      getSortedArticleListSearch(state as StateSchema)
    ).toEqual('value')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getSortedArticleListSearch(state as StateSchema)
    ).toEqual('')
  })
})
