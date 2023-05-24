import { comments, entities, ids } from '../mocks/data'
import { articleCommentListReducer } from './articleCommentListSlice'
import type { ArticleCommentListSchema } from '../types/articleCommentListSchema'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'

describe('articleCommentsSlice', () => {
  test('fetchCommentsByArticleId service pending', () => {
    const state: DeepPartial<ArticleCommentListSchema> = {
      isLoading: false,
      error: 'error',
    }
    expect(
      articleCommentListReducer(
        state as ArticleCommentListSchema,
        fetchCommentsByArticleId.pending
      )
    ).toEqual({ isLoading: true })
  })

  test('fetchCommentsByArticleId service fulfilled', () => {
    const state: DeepPartial<ArticleCommentListSchema> = {
      isLoading: true,
    }
    expect(
      articleCommentListReducer(
        state as ArticleCommentListSchema,
        fetchCommentsByArticleId.fulfilled(comments, '', 1)
      )
    ).toEqual({ isLoading: false, entities, ids })
  })

  test('fetchCommentsByArticleId service rejected', () => {
    const state: DeepPartial<ArticleCommentListSchema> = {
      isLoading: true,
    }
    expect(
      articleCommentListReducer(
        state as ArticleCommentListSchema,
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
