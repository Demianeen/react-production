import type { StateSchema } from 'app/providers/StoreProvider'

export const getArticleDetailsRecommendationsState = (
  state: StateSchema
) => state?.articleDetailsFooter?.recommendations
