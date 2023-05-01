import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'

export const getUserId = createSelector(
  getUserAuthData,
  (data) => data?.id
)
