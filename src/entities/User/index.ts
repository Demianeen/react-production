export {
  userReducer,
  userActions,
  userSliceName,
} from './model/slice/userSlice'

export type { UserSchema, User } from './model/types/user'
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'
