import type { StateSchema } from '@/app/providers/StoreProvider'
import { getArticleInfiniteListPage } from './getArticleInfiniteListPage'

describe('getArticleInfiniteListPage', () => {
  it('should return the page', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        page: 2,
      },
    }
    expect(
      getArticleInfiniteListPage(state as StateSchema)
    ).toEqual(2)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListPage(state as StateSchema)
    ).toEqual(1)
  })
})
