import { createSelector } from '@reduxjs/toolkit'
import { getAddCommentFormState } from '../getAddCommentFormState/getAddCommentFormState'

export const getAddCommentFormError = createSelector(
  getAddCommentFormState,
  (state) => state?.error
)
