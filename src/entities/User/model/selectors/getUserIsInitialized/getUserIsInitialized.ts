import { createSelector } from '@reduxjs/toolkit'
import { getUser } from 'entities/User/model/selectors/getUser/getUser'

export const getUserIsInitialized = createSelector(
  getUser,
  (user) => user._isInitialized
)
