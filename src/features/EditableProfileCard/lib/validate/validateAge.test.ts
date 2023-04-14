import { validateProfileForm } from 'features/EditableProfileCard/model/services/validateProfileForm/validateProfileForm'
import { ProfileValidationError } from 'features/EditableProfileCard/model/types/profileSchema'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

const data = {
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
}

describe('validateAge', () => {
  test('success', () => {
    const result = validateProfileForm({
      ...data,
      age: 30,
    })

    expect(result).toEqual([])
  })

  test('missing age', () => {
    const result = validateProfileForm({
      ...data,
      age: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_AGE,
    ])
  })

  test('incorrect age', () => {
    const result = validateProfileForm({
      ...data,
      age: 1,
    })

    expect(result).toEqual([
      ProfileValidationError.INCORRECT_AGE,
    ])
  })
})
