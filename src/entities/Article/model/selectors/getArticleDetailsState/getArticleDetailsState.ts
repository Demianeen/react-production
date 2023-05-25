import type { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleDetailsState = (
  state: StateSchema
) => state?.articleDetails
