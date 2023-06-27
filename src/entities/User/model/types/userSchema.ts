import type { FeatureFlags } from '@/shared/types/featureFlags'
import type { UserRole } from '../const/userRole'

export interface User {
  id: number
  username: string
  roles: [UserRole, ...UserRole[]]
  avatar?: string
  features: FeatureFlags
}

export interface UserSchema {
  authData?: User

  _isInitialized: boolean
}
