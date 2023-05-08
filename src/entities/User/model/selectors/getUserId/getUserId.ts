import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '../getUserAuthData/getUserAuthData'

export const getUserId = createSelector(
  getUserAuthData,
  (data) => data?.id
)
