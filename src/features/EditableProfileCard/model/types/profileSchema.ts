import type { Profile } from '@/entities/Profile'
import type { ProfileValidationError } from '@/features/EditableProfileCard/model/const/profileValidationError'

export interface ProfileSchema {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  isReadonly: boolean
  validationErrors?: ProfileValidationError[]
}
