import type { Currency } from '@/entities/Currency'
import type { Country } from '@/entities/Country'

export interface Profile {
  id?: number
  firstName?: string
  lastName?: string
  age?: number
  currency?: Currency
  country?: Country
  city?: string
  username?: string
  avatar?: string
}
