import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'

export const getIsUserLogged = createSelector(
  getUserAuthData,
  (data) => data !== undefined
)
