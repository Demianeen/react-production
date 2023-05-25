import { ProfileValidationError } from '@/features/EditableProfileCard/model/const/profileValidationError'

export const validateAge = (
  age: number | undefined
): ProfileValidationError[] => {
  const errors: ProfileValidationError[] = []

  if (!age) {
    errors.push(ProfileValidationError.MISSING_AGE)
  } else if (age < 18) {
    errors.push(ProfileValidationError.INCORRECT_AGE)
  }

  return errors
}
