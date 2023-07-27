import { buildSelector } from '@/shared/lib/store'
import { getCommentFormState } from '../getCommentFormState/getCommentFormState'

export const [useCommentFormBody, getCommentFormBody] = buildSelector(
  getCommentFormState,
  (state) => state?.body ?? ''
)
