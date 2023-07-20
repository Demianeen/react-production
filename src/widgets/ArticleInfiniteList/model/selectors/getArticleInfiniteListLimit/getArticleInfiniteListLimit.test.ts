import type { StateSchema } from '@/app/providers/StoreProvider'
import { getArticleInfiniteListLimit } from './getArticleInfiniteListLimit'

describe('getArticleInfiniteListLimit', () => {
  it('should return the limit', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        limit: 4,
      },
    }
    expect(getArticleInfiniteListLimit(state as StateSchema)).toEqual(
      4
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getArticleInfiniteListLimit(state as StateSchema)).toEqual(
      0
    )
  })
})
