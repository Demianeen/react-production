import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import type { Article } from 'entities/Article'
import type { StateSchema } from 'app/providers/StoreProvider'
import { fetchArticleRecommendations } from 'features/ArticleCommentList/model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { getArticleDetailsRecommendationsState } from 'features/ArticleCommentList/model/selectors/recommendations/getArticleDetailsRecommendationsState/getArticleDetailsRecommendationsState'
import type { ArticleDetailsRecommendationsSchema } from '../types/articleDetailsRecommendationsSchema'

const recommendationsAdapter =
  createEntityAdapter<Article>()

const initialState: ArticleDetailsRecommendationsSchema =
  recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
    {
      isLoading: false,
      ids: [],
      entities: {},
    }
  )

export const articleDetailsRecommendationsSlice =
  createSlice({
    name: 'articleDetailsRecommendations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(
          fetchArticleRecommendations.pending,
          (state) => {
            state.error = undefined
            state.isLoading = true
          }
        )
        .addCase(
          fetchArticleRecommendations.fulfilled,
          (state, action) => {
            state.isLoading = false
            recommendationsAdapter.setAll(
              state,
              action.payload
            )
          }
        )
        .addCase(
          fetchArticleRecommendations.rejected,
          (state, action) => {
            state.isLoading = false
            state.error = action.payload
          }
        )
    },
  })

export const {
  actions: articleDetailsRecommendationsActions,
} = articleDetailsRecommendationsSlice
export const {
  reducer: articleDetailsRecommendationsReducer,
} = articleDetailsRecommendationsSlice

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors(
    (state: StateSchema) =>
      getArticleDetailsRecommendationsState(state) ??
      initialState
  )
