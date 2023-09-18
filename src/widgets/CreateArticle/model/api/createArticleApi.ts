import { rtkApi } from '@/shared/api/rtkApi'
import type { Article } from '@/entities/Article'
import type { CreateArticleForm } from '../types/createArticleSchema'

interface CreateArticleArgs extends CreateArticleForm {
  contentHtmlString: string
  userId: number
}

const createArticleApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation<Article, CreateArticleArgs>({
      query: (body) => ({
        url: `/articles`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateArticleMutation } = createArticleApi
