import { RegistrationValidationError } from '../../const/registrationValidationError'

export interface ValidateRegistrationFormSchema {
  username: string
  password: string
  confirmPassword: string
}

export const validateRegistrationForm = ({
  username,
  password,
  confirmPassword,
}: ValidateRegistrationFormSchema) => {
  const errors: RegistrationValidationError[] = []

  if (!username) {
    errors.push(RegistrationValidationError.MISSING_USERNAME)
  } else if (username.includes(' ')) {
    errors.push(RegistrationValidationError.INVALID_USERNAME)
  }

  if (!password) {
    errors.push(RegistrationValidationError.MISSING_PASSWORD)
  } else if (password.length < 8) {
    errors.push(RegistrationValidationError.PASSWORD_TOO_SHORT)
  }

  if (!confirmPassword) {
    errors.push(RegistrationValidationError.MISSING_CONFIRM_PASSWORD)
  }

  if (password !== confirmPassword) {
    errors.push(RegistrationValidationError.PASSWORDS_DO_NOT_MATCH)
  }

  return errors
}
