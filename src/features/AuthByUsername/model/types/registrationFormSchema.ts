import type { RegistrationValidationError } from '../const/registrationValidationError'

export interface RegistrationFormSchema {
  username: string
  password: string
  confirmPassword: string
  isLoading: boolean
  errors?: RegistrationValidationError[]
}
