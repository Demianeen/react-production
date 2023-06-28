export {
  userReducer,
  userActions,
  useUserActions,
} from './model/slice/userSlice'

export type { UserSchema, User } from './model/types/userSchema'

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'
export { getUserIsInitialized } from './model/selectors/getUserIsInitialized/getUserIsInitialized'
export { getUserId } from './model/selectors/getUserId/getUserId'
export { getIsUserLogged } from './model/selectors/getIsUserLogged/getIsUserLogged'
export { getUserRoles } from './model/selectors/getUserRoles/getUserRoles'
export { getIsUserAdmin } from './model/selectors/getIsUserAdmin/getIsUserAdmin'
export { getIsUserManager } from './model/selectors/getIsUserManager/getIsUserManager'
export { UserRole } from './model/const/userRole'

export { useUserJsonSettings } from './model/selectors/jsonSettings'

export { useSaveJsonSettings } from './model/services/saveJsonSettings'
