import type { StateSchema } from 'app/providers/StoreProvider'
import { SortOrder } from 'shared/types/sort'
import { getArticleInfiniteListOrder } from './getArticleInfiniteListOrder'

describe('getArticleInfiniteListOrder', () => {
  it('should return the order', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        order: SortOrder.DESC,
      },
    }
    expect(
      getArticleInfiniteListOrder(state as StateSchema)
    ).toEqual(SortOrder.DESC)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListOrder(state as StateSchema)
    ).toEqual(SortOrder.ASC)
  })
})
