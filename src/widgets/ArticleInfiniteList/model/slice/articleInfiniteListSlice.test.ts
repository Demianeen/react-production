import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { View } from '@/entities/ListFilters'
import {
  anotherMockArticleEntities,
  anotherMockArticleIds,
  anotherMockArticles,
  mockArticleEntities,
  mockArticleIds,
} from '@/entities/Article/testing'
import { fetchArticles } from '../services/fetchArticles/fetchArticles'
import type { ArticleInfiniteListSchema } from '../types/articleInfiniteListSchema'
import {
  articleInfiniteListActions,
  articleInfiniteListReducer,
} from './articleInfiniteListSlice'

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
    localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, View.LIST)
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
      entities: mockArticleEntities,
      ids: mockArticleIds,
      isLoading: false,
      error: 'error',
    }
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
        fetchArticles.pending
      )
    ).toEqual({
      entities: mockArticleEntities,
      ids: mockArticleIds,
      isLoading: true,
      error: undefined,
    })
  })

  test('fetchArticles service pending with replace = true', () => {
    const state: DeepPartial<ArticleInfiniteListSchema> = {
      entities: mockArticleEntities,
      ids: mockArticleIds,
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
      entities: mockArticleEntities,
      ids: mockArticleIds,
      isLoading: true,
      error: undefined,
      limit: 12,
    }
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
        fetchArticles.fulfilled(anotherMockArticles, '')
      )
    ).toEqual({
      entities: {
        ...mockArticleEntities,
        ...anotherMockArticleEntities,
      },
      ids: [...mockArticleIds, ...anotherMockArticleIds],
      isLoading: false,
      error: undefined,
      hasMore: true,
      limit: 12,
    })
  })

  test('fetchArticles service fulfilled with replace = true', () => {
    const state: DeepPartial<ArticleInfiniteListSchema> = {
      entities: mockArticleEntities,
      ids: mockArticleIds,
      isLoading: true,
      error: undefined,
      limit: 12,
    }
    expect(
      articleInfiniteListReducer(
        state as ArticleInfiniteListSchema,
        fetchArticles.fulfilled(anotherMockArticles, '', {
          replace: true,
        })
      )
    ).toEqual({
      entities: anotherMockArticleEntities,
      ids: anotherMockArticleIds,
      isLoading: false,
      error: undefined,
      hasMore: true,
      limit: 12,
    })
  })
})
