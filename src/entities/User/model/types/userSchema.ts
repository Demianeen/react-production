export interface User {
  id: number
  username: string
  avatar?: string
  role: 'ADMIN' | 'USER'
}

export interface UserSchema {
  authData?: User

  _isInitialized: boolean
}
