import type { UserRole } from '../const/userRole'

export interface User {
  id: number
  username: string
  roles: [UserRole, ...UserRole[]]
  avatar?: string
}

export interface UserSchema {
  authData?: User

  _isInitialized: boolean
}
