export {
  userReducer,
  userActions,
  userSliceName,
} from './model/slice/userSlice'

export type {
  UserSchema,
  User,
} from './model/types/userSchema'
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'
export { getUserIsInitialized } from './model/selectors/getUserIsInitialized/getUserIsInitialized'
