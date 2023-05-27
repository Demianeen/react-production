import { rtkApi } from '@/shared/api/rtkApi'
import type { Rating } from '@/entities/Rating'
import type { ArticleRating } from '@/features/ArticleRating/model/types/articleRating'

interface GetArticleRatingParams {
  userId: number
  articleId: number
}

interface RateArticleParams {
  userId: number
  articleId: number
  rating: number
  feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleRating: builder.query<
      ArticleRating[] | undefined,
      GetArticleRatingParams
    >({
      query: (params) => ({
        url: '/article-rating',
        params,
      }),
    }),
    rateArticle: builder.mutation<
      Rating,
      RateArticleParams
    >({
      query: (body) => ({
        url: '/article-rating',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetArticleRatingQuery,
  useRateArticleMutation,
} = articleRatingApi
