import { createSelector } from '@reduxjs/toolkit'
import { getLoginFormState } from '../getLoginFormState/getLoginFormState'

export const getLoginFormPassword = createSelector(
  getLoginFormState,
  (state) => state?.password ?? ''
)
