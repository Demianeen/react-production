import { createSelector } from '@reduxjs/toolkit'
import { getCommentFormState } from '../getCommentFormState/getCommentFormState'

export const getCommentFormBody = createSelector(
  getCommentFormState,
  (state) => state?.body ?? ''
)
