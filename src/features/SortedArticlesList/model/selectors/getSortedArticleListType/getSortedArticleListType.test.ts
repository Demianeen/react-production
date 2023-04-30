import type { StateSchema } from 'app/providers/StoreProvider'
import { ArticleType } from 'entities/Article'
import { getSortedArticleListType } from './getSortedArticleListType'

describe('getSortedArticleListType', () => {
  it('should return the type', () => {
    const state: DeepPartial<StateSchema> = {
      sortedArticleList: {
        type: ArticleType.IT,
      },
    }
    expect(
      getSortedArticleListType(state as StateSchema)
    ).toEqual(ArticleType.IT)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getSortedArticleListType(state as StateSchema)
    ).toEqual(ArticleType.ALL)
  })
})
