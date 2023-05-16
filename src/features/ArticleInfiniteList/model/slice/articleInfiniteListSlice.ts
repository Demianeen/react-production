import type { PayloadAction } from '@reduxjs/toolkit'
import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import type { StateSchema } from 'app/providers/StoreProvider'
import type { Article, ArticleType } from 'entities/Article'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { SortOrder } from 'shared/types/sort'
import { SortField, View } from 'entities/ListFilters'
import { fetchArticles } from '../services/fetchArticles/fetchArticles'
import type { ArticleInfiniteListSchema } from '../types/articleInfiniteListSchema'
import { INITIAL_ARTICLE_VIEW } from '../const/view'

const articlesAdapter = createEntityAdapter<Article>()

const initialState: ArticleInfiniteListSchema =
  articlesAdapter.getInitialState({
    isLoading: false,
    page: 1,
    hasMore: true,
    _isInitialized: false,
    view: INITIAL_ARTICLE_VIEW,
    limit: 12,
    startIndex: 0,
    order: SortOrder.ASC,
    search: '',
    sortField: SortField.CREATED_AT,
    type: 'ALL' as ArticleType.ALL,
  })

export const articleInfiniteListSlice = createSlice({
  name: 'articleInfiniteList',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setStartIndex: (
      state,
      action: PayloadAction<number>
    ) => {
      state.startIndex = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSortField: (
      state,
      action: PayloadAction<SortField>
    ) => {
      state.sortField = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setView: (state, action: PayloadAction<View>) => {
      state.view = action.payload
      state.limit = action.payload === View.GRID ? 12 : 4
      state.startIndex = 0
      localStorage.setItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY,
        action.payload
      )
    },
    setType: (
      state,
      action: PayloadAction<ArticleType>
    ) => {
      state.type = action.payload
    },
    initState: (state) => {
      const view =
        (localStorage.getItem(
          ARTICLE_VIEW_LOCALSTORAGE_KEY
        ) as View) ?? INITIAL_ARTICLE_VIEW
      state.limit = view === View.GRID ? 12 : 4
      state.view = view
      state._isInitialized = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true

        if (action?.meta?.arg?.replace === true) {
          articlesAdapter.removeAll(state)
        }
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasMore =
          action.payload.length === state.limit

        if (action?.meta?.arg?.replace === true) {
          articlesAdapter.setAll(state, action.payload)
        } else {
          articlesAdapter.addMany(state, action.payload)
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { actions: articleInfiniteListActions } =
  articleInfiniteListSlice
export const { reducer: articleInfiniteListReducer } =
  articleInfiniteListSlice

export const getArticles = articlesAdapter.getSelectors(
  (state: StateSchema) =>
    state.articleInfiniteList ?? initialState
)
