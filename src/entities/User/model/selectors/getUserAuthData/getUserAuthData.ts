import { createSelector } from '@reduxjs/toolkit'
import { getUserState } from 'entities/User/model/selectors/getUserState/getUserState'

export const getUserAuthData = createSelector(
  getUserState,
  (user) => user?.authData
)
