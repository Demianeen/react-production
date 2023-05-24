import { createSelector } from '@reduxjs/toolkit'
import { getCommentFormState } from '../getCommentFormState/getCommentFormState'

export const getCommentFormError = createSelector(
  getCommentFormState,
  (state) => state?.error
)
