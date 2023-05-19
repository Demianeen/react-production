export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

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
