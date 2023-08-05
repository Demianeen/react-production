import type { Profile } from '@/entities/Profile'
import type { ProfileValidationError } from '../const/profileValidationError'

export interface EditableProfileSchema {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  isReadonly: boolean
  validationErrors?: ProfileValidationError[]
}
