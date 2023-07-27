import { buildSelector } from '@/shared/lib/store'
import { getUserAuthData } from '../getUserAuthData/getUserAuthData'

export const [useUserId, getUserId] = buildSelector(
  getUserAuthData,
  (data) => data?.id
)
