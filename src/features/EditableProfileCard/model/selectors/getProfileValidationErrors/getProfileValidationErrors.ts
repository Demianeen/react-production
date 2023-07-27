import { buildSelector } from '@/shared/lib/store'
import { getProfileState } from '../getProfileState/getProfileState'

export const [
  useProfileValidationErrors,
  getProfileValidationErrors,
] = buildSelector(getProfileState, (state) => state?.validationErrors)
