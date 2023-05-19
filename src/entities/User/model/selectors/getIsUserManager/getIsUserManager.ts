import { createSelector } from '@reduxjs/toolkit'
import { getUserRoles } from '../getUserRoles/getUserRoles'
import { UserRole } from '../../types/userSchema'

export const getIsUserManager = createSelector(
  getUserRoles,
  (roles) => Boolean(roles.includes(UserRole.ADMIN))
)
