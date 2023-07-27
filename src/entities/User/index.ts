export {
  userReducer,
  userActions,
  useUserActions,
} from './model/slice/userSlice'

export type { UserSchema, User } from './model/types/userSchema'

export {
  useUserAuthData,
  getUserAuthData,
} from './model/selectors/getUserAuthData/getUserAuthData'
export { useUserIsInitialized } from './model/selectors/getUserIsInitialized/getUserIsInitialized'
export {
  getUserId,
  useUserId,
} from './model/selectors/getUserId/getUserId'
export { useIsUserLogged } from './model/selectors/getIsUserLogged/getIsUserLogged'
export { useUserRoles } from './model/selectors/getUserRoles/getUserRoles'
export { useIsUserAdmin } from './model/selectors/getIsUserAdmin/getIsUserAdmin'
export { useIsUserManager } from './model/selectors/getIsUserManager/getIsUserManager'
export { UserRole } from './model/const/userRole'

export { useUserJsonSettings } from './model/selectors/jsonSettings'

export { useSaveJsonSettings } from './model/services/saveJsonSettings'
export { useInitAuthData } from './model/services/initAuthData'

export { useJsonSettingOnUserInit } from './lib/useJsonSettingOnUserInit'
