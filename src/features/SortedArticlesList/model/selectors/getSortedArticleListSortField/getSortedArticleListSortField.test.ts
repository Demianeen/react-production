import type { StateSchema } from 'app/providers/StoreProvider'
import { ArticleSortField } from '../../types/sortedArticleListSchema'
import { getSortedArticleListSortField } from './getSortedArticleListSortField'

describe('getSortedArticleListSortField', () => {
  it('should return the sort', () => {
    const state: DeepPartial<StateSchema> = {
      sortedArticleList: {
        sort: ArticleSortField.TITLE,
      },
    }
    expect(
      getSortedArticleListSortField(state as StateSchema)
    ).toEqual(ArticleSortField.TITLE)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getSortedArticleListSortField(state as StateSchema)
    ).toEqual(undefined)
  })
})
