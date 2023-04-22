import type { StateSchema } from 'app/providers/StoreProvider'

export const getAddCommentFormState = (
  state: StateSchema
) => state.addCommentForm
