import { createSelector } from '@reduxjs/toolkit'
import { UserRole } from 'entities/User/model/const/userRole'
import { getUserRoles } from '../getUserRoles/getUserRoles'


export const getIsUserAdmin = createSelector(
  getUserRoles,
  (roles) => Boolean(roles.includes(UserRole.ADMIN))
)
