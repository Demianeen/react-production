import type {
  CounterSchema,
  counterSliceName,
} from 'entities/Counter'
import type {
  UserSchema,
  userSliceName,
} from 'entities/User'
import type {
  LoginSchema,
  loginSliceName,
} from 'features/AuthByUsername'

export interface StateSchema {
  [counterSliceName]: CounterSchema
  [userSliceName]: UserSchema
  [loginSliceName]: LoginSchema
}
