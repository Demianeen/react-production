import type { PayloadAction } from '@reduxjs/toolkit'
import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import type { StateSchema } from 'app/providers/StoreProvider'
import type { Article } from 'entities/Article'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { View } from 'entities/View'
import { INITIAL_ARTICLE_VIEW } from 'features/SortedArticlesList/model/const/view'
import { sortedArticleListActions } from 'features/SortedArticlesList'
import { fetchArticles } from '../services/fetchArticles/fetchArticles'
import type { ArticlesPageSchema } from '../types/articlesPageSchema'

const articlesAdapter = createEntityAdapter<Article>()

const initialState: ArticlesPageSchema =
  articlesAdapter.getInitialState({
    isLoading: false,
    page: 1,
    hasMore: true,
    _isInitialized: false,
    view: View.GRID,
    limit: 12,
    startIndex: 0,
  })

export const articlesPageSlice = createSlice({
  name: 'articlesPage',
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
    initState: (state) => {
      const view =
        (localStorage.getItem(
          ARTICLE_VIEW_LOCALSTORAGE_KEY
        ) as View) ?? INITIAL_ARTICLE_VIEW
      state.limit = view === View.GRID ? 12 : 4
      state._isInitialized = true
    },
  },
  extraReducers: (builder) => {
    builder
      // selectArticleView
      .addCase(
        sortedArticleListActions.setView,
        (state, action) => {
          state.limit =
            action.payload === View.GRID ? 12 : 4
          state.startIndex = 0
        }
      )
      // fetchArticles
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

export const { actions: articlesPageActions } =
  articlesPageSlice
export const { reducer: articlesPageReducer } =
  articlesPageSlice

export const getArticles = articlesAdapter.getSelectors(
  (state: StateSchema) => state.articlesPage ?? initialState
)
