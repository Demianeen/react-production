import type { PayloadAction } from '@reduxjs/toolkit'
import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import type { StateSchema } from 'app/providers/StoreProvider'
import type { Article } from 'entities/Article'
import { ArticleView } from 'entities/Article'
import { fetchArticles } from 'pages/ArticlesPage/model/services/fetchArticles/fetchArticles'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import type { ArticlesPageSchema } from '../types/articlesPageSchema'

const articlesAdapter = createEntityAdapter<Article>()

const initialState: ArticlesPageSchema =
  articlesAdapter.getInitialState({
    isLoading: false,
    view: ArticleView.GRID,
    page: 1,
    hasMore: true,
  })

export const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState,
  reducers: {
    setView: (
      state,
      action: PayloadAction<ArticleView>
    ) => {
      state.view = action.payload
      localStorage.setItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY,
        action.payload
      )
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView
      state.view = view
      state.limit = view === ArticleView.GRID ? 12 : 4
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false
        articlesAdapter.addMany(state, action.payload)
        state.hasMore =
          action.payload.length === state.limit
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
