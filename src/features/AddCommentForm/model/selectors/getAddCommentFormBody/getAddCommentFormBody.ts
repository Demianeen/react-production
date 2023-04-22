import { createSelector } from '@reduxjs/toolkit'
import { getAddCommentFormState } from '../getAddCommentFormState/getAddCommentFormState'

export const getAddCommentFormBody = createSelector(
  getAddCommentFormState,
  (state) => state?.body ?? ''
)
