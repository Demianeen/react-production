import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '../getUserAuthData/getUserAuthData'

export const getIsUserLogged = createSelector(
  getUserAuthData,
  (data) => data !== undefined
)
