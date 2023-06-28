import type { FeatureFlags } from '@/shared/types/featureFlags'
import type { JsonSettings } from './jsonSettings'
import type { UserRole } from '../const/userRole'

export interface User {
  id: number
  username: string
  roles: [UserRole, ...UserRole[]]
  avatar?: string
  features: FeatureFlags
  jsonSettings?: JsonSettings
}

export interface UserSchema {
  authData?: User
  isJsonLoading: boolean
  jsonError?: string

  _isInitialized: boolean
}
