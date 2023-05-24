import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import type { Profile } from 'entities/Profile'

// TODO: move all mock data to entities
export const mockProfile: Profile = {
  id: 1,
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
  avatar: 'https://mockapi.com/avatar',
}
