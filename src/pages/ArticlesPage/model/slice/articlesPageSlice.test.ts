import {
  articlesPageActions,
  articlesPageReducer,
} from 'pages/ArticlesPage/model/slice/articlesPageSlice'
import type { ArticlesPageSchema } from 'pages/ArticlesPage'
import { ArticleView } from 'entities/Article'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

describe('articlesPageSlice', () => {
  test('setView', () => {
    const state: DeepPartial<ArticlesPageSchema> = {}
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.setView(ArticleView.LIST)
      )
    ).toEqual({
      view: ArticleView.LIST,
    })
  })

  test('setPage', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      page: 1,
    }
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.setPage(2)
      )
    ).toEqual({
      page: 2,
    })
  })

  test('initState', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      view: ArticleView.GRID,
    }
    localStorage.setItem(
      ARTICLE_VIEW_LOCALSTORAGE_KEY,
      ArticleView.LIST
    )
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.initState()
      )
    ).toEqual({ view: ArticleView.LIST, limit: 12 })
  })
})
