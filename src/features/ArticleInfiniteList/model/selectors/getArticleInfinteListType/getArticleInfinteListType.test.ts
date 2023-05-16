import type { StateSchema } from 'app/providers/StoreProvider'
import { ArticleType } from 'entities/Article'
import { getArticleInfiniteListType } from './getArticleInfiniteListType'

describe('getArticleInfiniteListType', () => {
  it('should return the type', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        type: ArticleType.IT,
      },
    }
    expect(
      getArticleInfiniteListType(state as StateSchema)
    ).toEqual(ArticleType.IT)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListType(state as StateSchema)
    ).toEqual(ArticleType.ALL)
  })
})
