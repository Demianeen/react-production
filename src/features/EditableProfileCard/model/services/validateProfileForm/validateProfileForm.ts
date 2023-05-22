import type { Profile } from 'entities/Profile'
import { ProfileValidationError } from 'features/EditableProfileCard/model/const/profileValidationError'
import { validateAge } from '../../../lib/validate/validateAge'

export const validateProfileForm = (profile?: Profile) => {
  const errors: ProfileValidationError[] = []

  if (!profile) {
    return [ProfileValidationError.NO_DATA]
  }

  if (!profile.id) {
    errors.push(ProfileValidationError.UNKNOWN_SERVER_ERROR)
  }

  if (!profile.firstName) {
    errors.push(ProfileValidationError.MISSING_FIRST_NAME)
  }

  if (!profile.lastName) {
    errors.push(ProfileValidationError.MISSING_LAST_NAME)
  }

  errors.push(...validateAge(profile.age))

  if (!profile.city) {
    errors.push(ProfileValidationError.MISSING_CITY)
  }

  if (!profile.username) {
    errors.push(ProfileValidationError.MISSING_USERNAME)
  }

  return errors
}
