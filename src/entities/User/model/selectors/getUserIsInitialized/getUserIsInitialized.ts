import { createSelector } from '@reduxjs/toolkit'
import { getUserState } from '../getUserState/getUserState'

export const getUserIsInitialized = createSelector(
  getUserState,
  (user) => user._isInitialized
)
