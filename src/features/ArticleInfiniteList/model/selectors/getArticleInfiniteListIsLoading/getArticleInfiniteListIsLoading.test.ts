import type { StateSchema } from '@/app/providers/StoreProvider'
import { getArticleInfiniteListIsLoading } from './getArticleInfiniteListIsLoading'

describe('getArticleInfiniteListIsLoading', () => {
  it('should return the isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        isLoading: true,
      },
    }
    expect(
      getArticleInfiniteListIsLoading(state as StateSchema)
    ).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListIsLoading(state as StateSchema)
    ).toEqual(false)
  })
})
