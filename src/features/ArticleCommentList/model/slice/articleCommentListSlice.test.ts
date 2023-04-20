import { articleCommentListReducer } from './articleCommentListSlice'
import type { ArticleCommentListSliceSchema } from '../types/articleCommentListSliceSchema'
import { comments, entities, ids } from '../const/tests'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'

describe('articleCommentsSlice', () => {
  test('fetchCommentsByArticleId service pending', () => {
    const state: DeepPartial<ArticleCommentListSliceSchema> =
      {
        isLoading: false,
        error: 'error',
      }
    expect(
      articleCommentListReducer(
        state as ArticleCommentListSliceSchema,
        fetchCommentsByArticleId.pending
      )
    ).toEqual({ isLoading: true })
  })

  test('fetchCommentsByArticleId service fulfilled', () => {
    const state: DeepPartial<ArticleCommentListSliceSchema> =
      {
        isLoading: true,
      }
    expect(
      articleCommentListReducer(
        state as ArticleCommentListSliceSchema,
        fetchCommentsByArticleId.fulfilled(comments, '', 1)
      )
    ).toEqual({ isLoading: false, entities, ids })
  })

  test('fetchCommentsByArticleId service rejected', () => {
    const state: DeepPartial<ArticleCommentListSliceSchema> =
      {
        isLoading: true,
      }
    expect(
      articleCommentListReducer(
        state as ArticleCommentListSliceSchema,
        fetchCommentsByArticleId.rejected(
          null,
          '',
          1,
          'error'
        )
      )
    ).toEqual({ error: 'error', isLoading: false })
  })
})
