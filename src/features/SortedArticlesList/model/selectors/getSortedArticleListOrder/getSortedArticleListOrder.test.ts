import { SortOrder } from 'shared/types/sort'
import type { StateSchema } from 'app/providers/StoreProvider'
import { getSortedArticleListOrder } from './getSortedArticleListOrder'

describe('getSortedArticleListOrder', () => {
  it('should return the order', () => {
    const state: DeepPartial<StateSchema> = {
      sortedArticleList: {
        order: SortOrder.DESC,
      },
    }
    expect(
      getSortedArticleListOrder(state as StateSchema)
    ).toEqual(SortOrder.DESC)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getSortedArticleListOrder(state as StateSchema)
    ).toEqual(undefined)
  })
})
