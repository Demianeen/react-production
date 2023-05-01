import { createSelector } from '@reduxjs/toolkit'
import { getUserState } from 'entities/User/model/selectors/getUserState/getUserState'

export const getUserIsInitialized = createSelector(
  getUserState,
  (user) => user._isInitialized
)
