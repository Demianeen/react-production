import { createSelector } from '@reduxjs/toolkit'
import { UserRole } from '../../const/userRole'
import { getUserAuthData } from '../getUserAuthData/getUserAuthData'

export const getUserRoles = createSelector(
  getUserAuthData,
  (authData) => authData?.roles ?? [UserRole.USER]
)
