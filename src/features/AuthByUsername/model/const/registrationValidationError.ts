export enum RegistrationValidationError {
  MISSING_USERNAME = 'MISSING_USERNAME',
  MISSING_PASSWORD = 'MISSING_PASSWORD',
  MISSING_CONFIRM_PASSWORD = 'MISSING_CONFIRM_PASSWORD',
  PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
  PASSWORDS_DO_NOT_MATCH = 'PASSWORDS_DO_NOT_MATCH',
  INVALID_USERNAME = 'INVALID_USERNAME',
  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  UNKNOWN_SERVER_ERROR = 'UNKNOWN_SERVER_ERROR',
}
