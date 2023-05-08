import type { StateSchema } from 'app/providers/StoreProvider'
import { ProfileValidationError } from '../../types/profileSchema'
import { getProfileValidationErrors } from './getProfileValidationErrors'

describe('getProfileValidationErrors', () => {
  it('should return the profile validation errors', () => {
    const validationErrors: ProfileValidationError[] = [
      ProfileValidationError.MISSING_AGE,
      ProfileValidationError.MISSING_CITY,
    ]

    const state: DeepPartial<StateSchema> = {
      profile: {
        validationErrors,
      },
    }
    expect(
      getProfileValidationErrors(state as StateSchema)
    ).toEqual(validationErrors)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getProfileValidationErrors(state as StateSchema)
    ).toEqual(undefined)
  })
})
