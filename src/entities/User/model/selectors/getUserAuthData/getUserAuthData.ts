import { createSelector } from '@reduxjs/toolkit'
import { getUser } from 'entities/User/model/selectors/getUser/getUser'

export const getUserAuthData = createSelector(
  getUser,
  (user) => user.authData
)
