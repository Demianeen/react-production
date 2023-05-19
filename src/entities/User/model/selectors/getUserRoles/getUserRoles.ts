import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '../getUserAuthData/getUserAuthData'
import { UserRole } from '../../types/userSchema'

export const getUserRoles = createSelector(
  getUserAuthData,
  (authData) => authData?.roles ?? [UserRole.USER]
)
