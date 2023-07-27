import { buildSelector } from '@/shared/lib/store'
import { getArticleDetailsState } from '../getArticleDetailsState/getArticleDetailsState'

export const [useArticleDetailsData, getArticleDetailsData] =
  buildSelector(getArticleDetailsState, (state) => state?.data)
