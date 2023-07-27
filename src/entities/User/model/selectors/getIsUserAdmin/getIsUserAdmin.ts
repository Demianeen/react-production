import { buildSelector } from '@/shared/lib/store'
import { UserRole } from '../../const/userRole'
import { getUserRoles } from '../getUserRoles/getUserRoles'

export const [useIsUserAdmin, getIsUserAdmin] = buildSelector(
  getUserRoles,
  (roles) => Boolean(roles.includes(UserRole.ADMIN))
)
