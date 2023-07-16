import avatar from '@/shared/assets/mocks/avatar.jpeg'
import { UserRole } from '../const/userRole'
import type { User } from '../types/userSchema'

export const mockUser = {
  id: 1,
  username: 'admin',
  roles: [UserRole.ADMIN],
  jsonSettings: {},
  avatar,
} as unknown as User
