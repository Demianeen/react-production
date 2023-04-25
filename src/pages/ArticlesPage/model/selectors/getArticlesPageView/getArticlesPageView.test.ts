import type { StateSchema } from 'app/providers/StoreProvider'
import { ArticleView } from 'entities/Article'
import { getArticlesPageView } from './getArticlesPageView'

describe('getArticlesPageView', () => {
  it('should return the view', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        view: ArticleView.LIST,
      },
    }
    expect(
      getArticlesPageView(state as StateSchema)
    ).toEqual(ArticleView.LIST)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticlesPageView(state as StateSchema)
    ).toEqual(ArticleView.GRID)
  })
})
