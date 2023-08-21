import type { StateSchema } from '@/app/providers/StoreProvider'
import { SortField } from '@/entities/SortField'
import { getArticleInfiniteListSortField } from './getArticleInfiniteListSortField'

describe('getArticleInfiniteListSortField', () => {
  it('should return the sortField', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        sortField: SortField.VIEWS,
      },
    }
    expect(
      getArticleInfiniteListSortField(state as StateSchema)
    ).toEqual(SortField.VIEWS)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListSortField(state as StateSchema)
    ).toEqual(SortField.CREATED_AT)
  })
})
