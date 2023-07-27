import { buildSelector } from '@/shared/lib/store'
import { UserRole } from '../../const/userRole'
import { getUserAuthData } from '../getUserAuthData/getUserAuthData'

export const [useUserRoles, getUserRoles] = buildSelector(
  getUserAuthData,
  (authData) => authData?.roles ?? [UserRole.USER]
)
