import { createSelector } from '@reduxjs/toolkit'
import { getLoginFormState } from '../getLoginFormState/getLoginFormState'

export const getLoginFormUsername = createSelector(
  getLoginFormState,
  (state) => state?.username ?? ''
)
