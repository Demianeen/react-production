import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { validateAge } from 'features/EditableProfileCard/lib/validate/validateAge'
import { validateProfileForm } from './validateProfileForm'
import { ProfileValidationError } from '../../types/profileSchema'

const data = {
  firstName: 'Demian',
  lastName: 'Netliukh',
  age: 30,
  currency: Currency.USD,
  country: Country.UK,
  city: 'London',
  username: 'admin',
}

jest.mock('../../../lib/validate/validateAge', () => ({
  __esModule: true,
  validateAge: jest.fn(() => []),
}))
const mockedValidateAge = jest.mocked(validateAge)

describe('validateProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('success', () => {
    const result = validateProfileForm(data)

    expect(result).toEqual([])
  })

  test('missing first name', () => {
    const result = validateProfileForm({
      ...data,
      firstName: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_FIRST_NAME,
    ])
  })

  test('missing last name', () => {
    const result = validateProfileForm({
      ...data,
      lastName: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_LAST_NAME,
    ])
  })

  test('age is validated', () => {
    validateProfileForm(data)
    expect(mockedValidateAge).toHaveBeenCalled()
  })

  test('missing city', () => {
    const result = validateProfileForm({
      ...data,
      city: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_CITY,
    ])
  })

  test('missing username', () => {
    const result = validateProfileForm({
      ...data,
      username: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_USERNAME,
    ])
  })

  test('no data', () => {
    const result = validateProfileForm(undefined)

    expect(result).toEqual([ProfileValidationError.NO_DATA])
  })
})
