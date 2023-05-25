import type { StateSchema } from '@/app/providers/StoreProvider'

export const getCommentFormState = (state: StateSchema) =>
  state.commentForm
