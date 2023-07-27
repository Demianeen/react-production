import { buildSelector } from '@/shared/lib/store'
import { getArticleDetailsState } from '../getArticleDetailsState/getArticleDetailsState'

export const [useArticleDetailsError, getArticleDetailsError] =
  buildSelector(getArticleDetailsState, (state) => state?.error)
