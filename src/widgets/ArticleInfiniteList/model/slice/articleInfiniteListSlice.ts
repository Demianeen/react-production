import { buildSlice } from '@/shared/lib/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createEntityAdapter } from '@reduxjs/toolkit'
import type { StateSchema } from '@/app/providers/StoreProvider'
import type { Article } from '@/entities/Article'
import { ArticleType } from '@/entities/Article'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { SortOrder } from '@/entities/Order'
import type { View } from '@/entities/View'
import { SortField } from '@/entities/SortField'
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
    limit: 0,
    startIndex: 0,
    order: SortOrder.ASC,
    search: '',
    sortField: SortField.CREATED_AT,
    type: ArticleType.ALL,
  })

export const articleInfiniteListSlice = buildSlice({
  name: 'articleInfiniteList',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setView: (state, action: PayloadAction<View>) => {
      state.view = action.payload
      // we calculate limit in the component, so we need to wait until it is set
      state.limit = 0
      state.startIndex = 0
      state.hasMore = true
      localStorage.setItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY,
        action.payload
      )
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    initState: (state) => {
      const view =
        (localStorage.getItem(
          ARTICLE_VIEW_LOCALSTORAGE_KEY
        ) as View) ?? INITIAL_ARTICLE_VIEW
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
        state.hasMore = action.payload.length >= state.limit

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

export const {
  actions: articleInfiniteListActions,
  useActions: useArticleInfiniteListActions,
  reducer: articleInfiniteListReducer,
} = articleInfiniteListSlice

export const getArticles = articlesAdapter.getSelectors(
  (state: StateSchema) => state.articleInfiniteList ?? initialState
)
