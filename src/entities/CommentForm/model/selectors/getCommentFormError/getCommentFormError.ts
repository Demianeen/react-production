import { buildSelector } from '@/shared/lib/store'
import { getCommentFormState } from '../getCommentFormState/getCommentFormState'

export const [useCommentFormError, getCommentFormError] =
  buildSelector(getCommentFormState, (state) => state?.error)
