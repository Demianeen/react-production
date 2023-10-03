import { getUserId } from '@/entities/User'
import { buildSelector } from '@/shared/lib/store'

export const [useArticleDetailsCanEdit, getArticleDetailsCanEdit] =
  buildSelector(
    getUserId,
    (_, authorId: number | undefined) => authorId,
    (userId, authorId) => {
      // because undefined === undefined is true
      if (!authorId || !userId) {
        return false
      }
      return authorId === userId
    },
  )
