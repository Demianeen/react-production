import type { ReducersMapObject } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import {
  counterReducer,
  counterSliceName,
} from 'entities/Counter'
import { userReducer, userSliceName } from 'entities/User'
import {
  loginReducer,
  loginSliceName,
} from 'features/AuthByUsername'
import type { StateSchema } from './StateSchema'

export const createReduxStore = (
  preloadedState?: StateSchema
) => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    [counterSliceName]: counterReducer,
    [userSliceName]: userReducer,
    [loginSliceName]: loginReducer,
  }

  return configureStore<StateSchema>({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState,
  })
}
