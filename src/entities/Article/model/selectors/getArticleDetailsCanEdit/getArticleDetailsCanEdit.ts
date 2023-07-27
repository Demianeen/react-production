import { getUserId } from '@/entities/User'
import { buildSelector } from '@/shared/lib/store'
import { getArticleDetailsAuthor } from '../getArticleDetailsAuthor/getArticleDetailsAuthor'

export const [useArticleDetailsCanEdit, getArticleDetailsCanEdit] =
  buildSelector(
    getUserId,
    getArticleDetailsAuthor,
    (userId, articleAuthor) => {
      // because undefined === undefined is true
      if (!articleAuthor || !userId) {
        return false
      }
      return articleAuthor?.id === userId
    }
  )
