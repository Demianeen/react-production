import { validateProfileForm } from 'features/EditableProfileCard/model/services/validateProfileForm/validateProfileForm'
import { ProfileValidationError } from 'features/EditableProfileCard/model/types/profileSchema'
import { profile } from 'features/EditableProfileCard/model/mocks/data'

describe('validateAge', () => {
  test('success', () => {
    const result = validateProfileForm({
      ...profile,
      age: 30,
    })

    expect(result).toEqual([])
  })

  test('missing age', () => {
    const result = validateProfileForm({
      ...profile,
      age: undefined,
    })

    expect(result).toEqual([
      ProfileValidationError.MISSING_AGE,
    ])
  })

  test('incorrect age', () => {
    const result = validateProfileForm({
      ...profile,
      age: 1,
    })

    expect(result).toEqual([
      ProfileValidationError.INCORRECT_AGE,
    ])
  })
})
