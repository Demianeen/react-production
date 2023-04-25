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
    initView: (state) => {
      state.view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView
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
        articlesAdapter.setAll(state, action.payload)
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
