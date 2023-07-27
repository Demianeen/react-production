import { buildSelector } from '@/shared/lib/store'
import { getProfileState } from '../getProfileState/getProfileState'

export const [useProfileIsLoading, getProfileIsLoading] =
  buildSelector(getProfileState, (state) => state?.isLoading ?? false)
