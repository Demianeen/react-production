import { rtkApi } from '@/shared/api/rtkApi'
import type { Article } from '../types/article'

const articleDetailsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleDetails: builder.query<Article, number>({
      query: (articleId) => ({
        url: `/articles/${articleId}`,
        params: {
          _expand: 'user',
        },
      }),
      providesTags: ['ArticleDetails'],
    }),
  }),
})

export const { useGetArticleDetailsQuery } = articleDetailsApi
