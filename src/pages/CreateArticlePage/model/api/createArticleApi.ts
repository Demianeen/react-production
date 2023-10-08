import { rtkApi } from '@/shared/api/rtkApi'
import type { Article } from '@/entities/Article'
import type { CreateArticleForm } from '../types/createArticleSchema'

interface CreateArticleArgs extends CreateArticleForm {
  contentHtmlString: string
  userId: number
  isEdit?: boolean
  articleId?: number
}

const createArticleApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation<Article, CreateArticleArgs>({
      query: (body) => {
        const { userId, articleId, isEdit, ...form } = body

        if (isEdit) {
          return {
            url: `/articles/${articleId}`,
            method: 'PATCH',
            body: form,
            invalidatesTags: ['ArticleDetails'],
          }
        }

        return {
          url: '/articles',
          method: 'POST',
          body: {
            ...form,
            userId,
          },
        }
      },
    }),
  }),
})

export const { useCreateArticleMutation } = createArticleApi
