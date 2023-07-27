import { buildSelector } from '@/shared/lib/store'
import { getUserAuthData } from '../getUserAuthData/getUserAuthData'

export const [useIsUserLogged, getIsUserLogged] = buildSelector(
  getUserAuthData,
  (data) => data !== undefined
)
