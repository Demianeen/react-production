import {
  articlesPageActions,
  articlesPageReducer,
} from 'pages/ArticlesPage/model/slice/articlesPageSlice'
import type { ArticlesPageSchema } from 'pages/ArticlesPage'
import { ArticleView } from 'entities/Article'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

describe('articlesPageSlice', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('setView', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      view: ArticleView.GRID,
      limit: 12,
    }
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.setView(ArticleView.LIST)
      )
    ).toEqual({
      view: ArticleView.LIST,
      limit: 4,
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

  test('initState with localstorage view value empty', () => {
    const state: DeepPartial<ArticlesPageSchema> = {}
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.initState()
      )
    ).toEqual({
      view: ArticleView.GRID,
      limit: 12,
      _isInitialized: true,
    })
  })

  test('initState with localstorage view value', () => {
    const state: DeepPartial<ArticlesPageSchema> = {}
    localStorage.setItem(
      ARTICLE_VIEW_LOCALSTORAGE_KEY,
      ArticleView.LIST
    )
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.initState()
      )
    ).toEqual({
      view: ArticleView.LIST,
      limit: 4,
      _isInitialized: true,
    })
  })
})
