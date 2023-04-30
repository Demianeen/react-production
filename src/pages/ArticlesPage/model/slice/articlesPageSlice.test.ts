import {
  articlesPageActions,
  articlesPageReducer,
} from 'pages/ArticlesPage/model/slice/articlesPageSlice'
import type { ArticlesPageSchema } from 'pages/ArticlesPage'
import { fetchArticles } from 'pages/ArticlesPage'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { View } from 'entities/View'
import { sortedArticleListActions } from 'features/SortedArticlesList'
import {
  anotherArticleIds,
  anotherArticles,
  articleIds,
  getArticleEntities,
} from '../mocks/data'

describe('articlesPageSlice', () => {
  beforeEach(() => {
    localStorage.clear()
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
      limit: 12,
      _isInitialized: true,
    })
  })

  test('initState with localstorage view value', () => {
    const state: DeepPartial<ArticlesPageSchema> = {}
    localStorage.setItem(
      ARTICLE_VIEW_LOCALSTORAGE_KEY,
      View.LIST
    )
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.initState()
      )
    ).toEqual({
      limit: 4,
      _isInitialized: true,
    })
  })

  test('setView extra reducer', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      limit: 12,
    }
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        sortedArticleListActions.setView(View.LIST)
      )
    ).toEqual({
      limit: 4,
    })
  })

  test('fetchArticles service pending', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      entities: getArticleEntities(),
      ids: articleIds,
      isLoading: false,
      error: 'error',
    }
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        fetchArticles.pending
      )
    ).toEqual({
      entities: getArticleEntities(),
      ids: articleIds,
      isLoading: true,
      error: undefined,
    })
  })

  test('fetchArticles service pending with replace = true', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      entities: getArticleEntities(),
      ids: articleIds,
      isLoading: false,
      error: 'error',
    }
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        fetchArticles.pending('', { replace: true })
      )
    ).toEqual({
      entities: {},
      ids: [],
      isLoading: true,
      error: undefined,
    })
  })

  test('fetchArticles service fulfilled', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      entities: getArticleEntities(),
      ids: articleIds,
      isLoading: true,
      error: undefined,
      limit: 12,
    }
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        fetchArticles.fulfilled(anotherArticles, '')
      )
    ).toEqual({
      entities: {
        ...getArticleEntities(),
        ...getArticleEntities(anotherArticles),
      },
      ids: [...articleIds, ...anotherArticleIds],
      isLoading: false,
      error: undefined,
      hasMore: true,
      limit: 12,
    })
  })

  test('fetchArticles service fulfilled with replace = true', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      entities: getArticleEntities(),
      ids: articleIds,
      isLoading: true,
      error: undefined,
      limit: 12,
    }
    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        fetchArticles.fulfilled(anotherArticles, '', {
          replace: true,
        })
      )
    ).toEqual({
      entities: getArticleEntities(anotherArticles),
      ids: anotherArticleIds,
      isLoading: false,
      error: undefined,
      hasMore: true,
      limit: 12,
    })
  })
})
