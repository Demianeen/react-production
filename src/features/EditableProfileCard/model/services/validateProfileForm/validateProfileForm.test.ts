import { ProfileValidationError } from 'features/EditableProfileCard/model/const/profileValidationError'
import { validateAge } from '../../../lib/validate/validateAge'
import { mockProfile } from '../../mocks/data'
import { validateProfileForm } from './validateProfileForm'


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
    const result = validateProfileForm(mockProfile)

    expect(result).toEqual([])
  })

  test('missing id', () => {
    const result = validateProfileForm({
      ...mockProfile,
      id: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.UNKNOWN_SERVER_ERROR,
    ])
  })

  test('missing first name', () => {
    const result = validateProfileForm({
      ...mockProfile,
      firstName: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_FIRST_NAME,
    ])
  })

  test('missing last name', () => {
    const result = validateProfileForm({
      ...mockProfile,
      lastName: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_LAST_NAME,
    ])
  })

  test('age is validated', () => {
    validateProfileForm(mockProfile)
    expect(mockedValidateAge).toHaveBeenCalled()
  })

  test('missing city', () => {
    const result = validateProfileForm({
      ...mockProfile,
      city: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_CITY,
    ])
  })

  test('missing username', () => {
    const result = validateProfileForm({
      ...mockProfile,
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
