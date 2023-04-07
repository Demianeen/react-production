import type {
  CounterSchema,
  counterSliceName,
} from 'entities/Counter'
import type {
  UserSchema,
  userSliceName,
} from 'entities/User'
import type {
  LoginFormSchema,
  loginFormSliceName,
} from 'features/AuthByUsername'
import type {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit'
import type { createReduxStore } from 'app/providers/StoreProvider'
import type { profileSliceName } from 'entities/Profile/model/slice/profileSlice'
import type { ProfileSchema } from 'entities/Profile'

export interface StateSchema {
  [counterSliceName]: CounterSchema
  [userSliceName]: UserSchema

  // Async reducers
  [loginFormSliceName]?: LoginFormSchema
  [profileSliceName]?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema
export type StateReducer = Reducer<StateSchema>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: StateReducer
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithReducerManager
  extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export type AppDispatch = ReturnType<
  typeof createReduxStore
>['dispatch']
