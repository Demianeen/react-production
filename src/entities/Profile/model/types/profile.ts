import type { Country, Currency } from 'shared/const/common'

export interface Profile {
  firstName: string
  lastName: string
  age: number
  currency: Currency
  country: Country
  city: string
  username: string
  profilePicture: string
}

export interface ProfileSchema {
  data?: Profile
  isLoading: boolean
  error?: string
  isReadonly: boolean
}
