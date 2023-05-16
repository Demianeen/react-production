import { rtkApi } from 'shared/api/rtkApi'

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleRecommendations: builder.query({
      query: (limit: number) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
})

export const { useGetArticleRecommendationsQuery } =
  recommendationsApi
