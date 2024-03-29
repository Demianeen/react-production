import type { ArticleDetailsSchema } from '../types/articleDetailsSchema'
import { articleDetailsReducer } from './articleDetailsSlice'
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById'
import { mockArticle } from '../mocks/mockArticle'

describe('articleDetailsSlice', () => {
  test('fetchArticleById service pending', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: false,
      error: 'error',
    }
    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.pending
      )
    ).toEqual({ isLoading: true })
  })

  test('fetchArticleById service fulfilled', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: true,
    }
    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.fulfilled(mockArticle, '', 1)
      )
    ).toEqual({ isLoading: false, data: mockArticle })
  })

  test('fetchArticleById service rejected', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: true,
    }
    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.rejected(null, '', 1, 'error')
      )
    ).toEqual({ error: 'error', isLoading: false })
  })
})
