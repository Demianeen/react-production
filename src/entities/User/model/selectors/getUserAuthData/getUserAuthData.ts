import { buildSelector } from '@/shared/lib/store'
import { getUserState } from '../getUserState/getUserState'

export const [useUserAuthData, getUserAuthData] = buildSelector(
  getUserState,
  (user) => user?.authData
)
