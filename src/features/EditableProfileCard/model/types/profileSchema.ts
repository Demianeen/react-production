import type { Currency } from 'entities/Currency/model/types/currency'
import type { Country } from 'entities/Country'

export interface Profile {
  firstName?: string
  lastName?: string
  age?: number
  currency?: Currency
  country?: Country
  city?: string
  username?: string
  avatar?: string
}

export enum ProfileValidationError {
  MISSING_FIRST_NAME = 'MISSING_FIRST_NAME',
  MISSING_LAST_NAME = 'MISSING_LAST_NAME',
  INCORRECT_AGE = 'INCORRECT_AGE',
  MISSING_AGE = 'MISSING_AGE',
  MISSING_CITY = 'MISSING_CITY',
  MISSING_USERNAME = 'MISSING_USERNAME',
  NO_DATA = 'NO_DATA',
  UNKNOWN_SERVER_ERROR = 'UNKNOWN_SERVER_ERROR',
}

export interface ProfileSchema {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  isReadonly: boolean
  validationErrors?: ProfileValidationError[]
}
