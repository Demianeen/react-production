import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

export const mockProfile = {
  id: 1,
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
}
