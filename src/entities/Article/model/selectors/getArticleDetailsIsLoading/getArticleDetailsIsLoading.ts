import { buildSelector } from '@/shared/lib/store'
import { getArticleDetailsState } from '../getArticleDetailsState/getArticleDetailsState'

export const [
  useArticleDetailsIsLoading,
  getArticleDetailsIsLoading,
] = buildSelector(
  getArticleDetailsState,
  (state) => state?.isLoading ?? false
)
