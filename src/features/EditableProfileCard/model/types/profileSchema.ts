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

export interface ProfileSchema {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  isReadonly: boolean
}
