import { validateAge } from '../../../lib/validate/validateAge'
import { profile } from '../../mocks/data'
import { validateProfileForm } from './validateProfileForm'
import { ProfileValidationError } from '../../types/profileSchema'

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
    const result = validateProfileForm(profile)

    expect(result).toEqual([])
  })

  test('missing id', () => {
    const result = validateProfileForm({
      ...profile,
      id: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.UNKNOWN_SERVER_ERROR,
    ])
  })

  test('missing first name', () => {
    const result = validateProfileForm({
      ...profile,
      firstName: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_FIRST_NAME,
    ])
  })

  test('missing last name', () => {
    const result = validateProfileForm({
      ...profile,
      lastName: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_LAST_NAME,
    ])
  })

  test('age is validated', () => {
    validateProfileForm(profile)
    expect(mockedValidateAge).toHaveBeenCalled()
  })

  test('missing city', () => {
    const result = validateProfileForm({
      ...profile,
      city: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_CITY,
    ])
  })

  test('missing username', () => {
    const result = validateProfileForm({
      ...profile,
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
