import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { View } from '@/entities/ListFilters'
import { fetchArticles } from '../services/fetchArticles/fetchArticles'
import type { ArticleInfiniteListSchema } from '../types/articleInfiniteListSchema'
import {
  articleInfiniteListActions,
  articleInfiniteListReducer,
} from './articleInfiniteListSlice'
import {
  anotherArticleIds,
  anotherArticles,
  articleIds,
  getArticleEntities,
} from '../mocks/data'

describe('articleInfiniteListSlice', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('setPage', () => {
    const state: DeepPartial<ArticleInfiniteListSchema> = {
      page: 1,
    }
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
        articleInfiniteListActions.setPage(2)
      )
    ).toEqual({
      page: 2,
    })
  })

  test('initState with localstorage view value empty', () => {
    const state: DeepPartial<ArticleInfiniteListSchema> = {}
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
        articleInfiniteListActions.initState()
      )
    ).toEqual({
      limit: 12,
      _isInitialized: true,
      view: View.GRID,
    })
  })

  test('initState with localstorage view value', () => {
    const state: DeepPartial<ArticleInfiniteListSchema> = {}
    localStorage.setItem(
      ARTICLE_VIEW_LOCALSTORAGE_KEY,
      View.LIST
    )
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
        articleInfiniteListActions.initState()
      )
    ).toEqual({
      limit: 4,
      _isInitialized: true,
      view: View.LIST,
    })
  })

  test('setView', () => {
    const state: DeepPartial<ArticleInfiniteListSchema> = {
      view: View.GRID,
    }
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
        articleInfiniteListActions.setView(View.LIST)
      )
    ).toEqual({
      view: View.LIST,
      limit: 4,
      startIndex: 0,
    })
  })

  test('fetchArticles service pending', () => {
    const state: DeepPartial<ArticleInfiniteListSchema> = {
      entities: getArticleEntities(),
      ids: articleIds,
      isLoading: false,
      error: 'error',
    }
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
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
    const state: DeepPartial<ArticleInfiniteListSchema> = {
      entities: getArticleEntities(),
      ids: articleIds,
      isLoading: false,
      error: 'error',
    }
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
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
    const state: DeepPartial<ArticleInfiniteListSchema> = {
      entities: getArticleEntities(),
      ids: articleIds,
      isLoading: true,
      error: undefined,
      limit: 12,
    }
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
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
    const state: DeepPartial<ArticleInfiniteListSchema> = {
      entities: getArticleEntities(),
      ids: articleIds,
      isLoading: true,
      error: undefined,
      limit: 12,
    }
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
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
