import { validateProfileForm } from '../../model/services/validateProfileForm/validateProfileForm'
import { ProfileValidationError } from '../../model/types/profileSchema'
import { mockProfile } from '../../model/mocks/data'

describe('validateAge', () => {
  test('success', () => {
    const result = validateProfileForm({
      ...mockProfile,
      age: 30,
    })

    expect(result).toEqual([])
  })

  test('missing age', () => {
    const result = validateProfileForm({
      ...mockProfile,
      age: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_AGE,
    ])
  })

  test('incorrect age', () => {
    const result = validateProfileForm({
      ...mockProfile,
      age: 1,
    })

    expect(result).toEqual([
      ProfileValidationError.INCORRECT_AGE,
    ])
  })
})
