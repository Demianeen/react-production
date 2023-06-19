import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { Comment } from '@/entities/Comment'
import type { StateSchema } from '@/app/providers/StoreProvider'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleCommentListState } from '../selectors/getArticleCommentListState/getArticleCommentListState'
import type { ArticleCommentListSchema } from '../types/articleCommentListSchema'

const articleCommentsAdapter = createEntityAdapter<Comment>()

const initialState =
  articleCommentsAdapter.getInitialState<ArticleCommentListSchema>({
    isLoading: true,
    ids: [],
    entities: {},
  })

const articleCommentListSlice = createSlice({
  name: 'articleCommentList',
  initialState,
  reducers: {
    addComment: articleCommentsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action) => {
          state.isLoading = false
          articleCommentsAdapter.setAll(state, action.payload)
        }
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { reducer: articleCommentListReducer } =
  articleCommentListSlice
export const { actions: articleCommentListActions } =
  articleCommentListSlice

export const getArticleCommentList =
  articleCommentsAdapter.getSelectors<StateSchema>(
    (state) => getArticleCommentListState(state) ?? initialState
  )
