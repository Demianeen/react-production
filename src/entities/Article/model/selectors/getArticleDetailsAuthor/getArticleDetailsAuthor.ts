import { buildSelector } from '@/shared/lib/store'
import { getArticleDetailsData } from '../getArticleDetailsData/getArticleDetailsData'

export const [useArticleDetailsAuthor, getArticleDetailsAuthor] =
  buildSelector(getArticleDetailsData, (state) => state?.user)
