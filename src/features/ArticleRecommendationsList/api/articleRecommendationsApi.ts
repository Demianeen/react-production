import { rtkApi } from '@/shared/api/rtkApi'
import type { Article } from '@/entities/Article'

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleRecommendations: builder.query<Article[], number>({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
          _expand: 'user',
        },
      }),
    }),
  }),
})

export const { useGetArticleRecommendationsQuery } =
  recommendationsApi
