import { buildSelector } from '@/shared/lib/store'
import { getUserState } from '../getUserState/getUserState'

export const [useUserIsInitialized, getUserIsInitialized] =
  buildSelector(getUserState, (user) => user._isInitialized)
