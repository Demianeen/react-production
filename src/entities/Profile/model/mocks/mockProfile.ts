import { Currency } from '@/entities/Currency'
import avatar from '@/shared/assets/mocks/avatar.jpeg'
import { Country } from '@/entities/Country'
import type { Profile } from '../types/profile'

export const mockProfile: Profile = {
  id: 1,
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
  avatar,
}
